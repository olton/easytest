import { glob } from 'glob';
import { pathToFileURL } from 'url';
import { realpathSync } from 'fs';
import inspector from 'inspector/promises';
import { coverageFilter, displayReport } from './core/coverage.js';
import { runner } from "./core/runner.js";
import { parallel } from "./core/parallel-runner.js";
import { testQueue } from './core/queue.js';
import { hooksRegistry } from './core/hooks.js';
import { DOM } from './core/registry.js';

import path from "path";
import chalk from 'chalk';
import { checkReactDependencies } from "./react/check-deps.js";
import { cleanup } from "./react/index.js";
import {BOT} from "./config/index.js";


// Экспортируем публичные API
export { Expect, expect } from "./expects/expect.js";
export { ExpectError } from "./expects/errors.js";
export * from './core/registry.js';
export { coverageFilter, generateReport, displayReport } from './core/coverage.js';
export { fire } from './events/index.js';
export { waitFor } from './utils/index.js';

// Главная функция запуска тестов
export const run = async (root, options = {}) => {
    global.testResults = {}
    options.root = root;

    const inspectPort = options.debug ? (options.debugPort || 9229) : undefined;

    if (options.debug) {
        console.log(chalk.yellow('[Debug] Waiting for debugger to attach...'));
        process.execArgv.push(`--inspect-brk=${inspectPort}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(chalk.green(`[Debug] Starting in debug mode on port ${inspectPort}`));
    }

    if (options.dom || options.react) {
        console.log(chalk.green(`${BOT} Preparing test environment...`));
    }
    
    // Настройка DOM, если требуется
    if (options.dom) {
        await DOM.setup();
            console.log(chalk.green(`   ${options.react ? "├" : "└"}── 📦 DOM ready!`));
    }

    if (options.react) {
        if (!checkReactDependencies(root)) {
            console.error(chalk.red('   └── ⚛️ React cannot be initialized due to missing dependencies.'));
            process.exit(1);
        }
        console.log(chalk.green(    '   └── ⚛️ React ready!'));
    }

    // Инициализация сессии для измерения покрытия кода
    const session = new inspector.Session();
    session.connect();

    await session.post('Profiler.enable');
    await session.post('Profiler.startPreciseCoverage', {
        callCount: true,
        detailed: true
    });

    testQueue.clearQueue();

    let files = [];

    // Если указаны конкретные файлы, используем их
    if (options.files && options.files.length) {
        files = options.files;
    }
    // Иначе используем паттерны включения/исключения
    else {
        const includePattern = options.include || '**/__tests__/**/*.test.js';
        const excludePattern = options.exclude || [];
        files = await glob(includePattern, { ignore: excludePattern });
    }

    // Загрузка и выполнение тестовых файлов
    for (const file of files) {
        testQueue.setCurrentFile(file);
        hooksRegistry.clearFileLevelHooks();

        const fileUrl = pathToFileURL(realpathSync(file)).href;

        // При повторном запуске тестов нужно удалить кеш модуля
        if (options.watch) {
            delete require.cache[require.resolve(file)];
        }

        await import(fileUrl + `?t=${Date.now()}`);
    }

    // Запуск тестов
    if (options.parallel) {
        await parallel(testQueue.getQueue(), options.maxWorkers);
    } else {
        await runner(testQueue.getQueue(), options);
    }

    const coverage = await session.post('Profiler.takePreciseCoverage');
    await session.post('Profiler.stopPreciseCoverage');

    if (options.react) {
        try {
            cleanup();
        } catch (e) {
            // Ігноруємо помилки
        }
    }

    // Обработка покрытия кода, если включено
    if (options.coverage) {
        const filteredCoverage = coverageFilter(coverage);
        
        if (options.reportType === 'lcov') {
            const createReport = await import('./reporters/lcov/index.js');
            createReport.default(options.reportDir + path.sep + (options.reportFile || 'easy-report.lcov'), filteredCoverage);
        } else if (options.reportType === 'html') {
            const createReport = await import('./reporters/html/index.js');
            createReport.default(options.reportDir + path.sep + (options.reportFile || 'easy-report.html'), global.testResults,  filteredCoverage);
        } else if (options.reportType === 'junit') { // Добавляем новое условие для junit
            const createReport = await import('./reporters/junit/index.js');
            createReport.default(options.reportDir + path.sep + (options.reportFile || 'junit.xml'), global.testResults);
        } else {
            displayReport(filteredCoverage);
        }
    }
    
    return global.testResults;
};
