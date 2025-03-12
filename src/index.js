import { glob } from 'glob';
import { pathToFileURL } from 'url';
import { realpathSync, existsSync, writeFileSync } from 'fs';
import inspector from 'inspector/promises';
import { coverageFilter, displayReport } from './core/coverage.js';
import {runner} from "./core/runner.js";
import {parallel} from "./core/parallel-runner.js";
import {testQueue} from './core/queue.js';
import { hooksRegistry } from './core/hooks.js';
import { DOM } from './core/registry.js';
import path from "path";
import chalk from 'chalk';

// Экспортируем публичные API
export { Expect, expect } from "./expects/expect.js";
export { ExpectError } from "./expects/errors.js";
export * from './core/registry.js';
export { coverageFilter, generateReport, displayReport } from './core/coverage.js';

// Главная функция запуска тестов
export const run = async (root, options = {}) => {
    options.root = root;

    const inspectPort = options.debug ? (options.debugPort || 9229) : undefined;

    if (options.debug) {
        console.log(chalk.yellow('[Debug] Waiting for debugger to attach...'));
        process.execArgv.push(`--inspect-brk=${inspectPort}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(chalk.green(`[Debug] Starting in debug mode on port ${inspectPort}`));
    }

    // Настройка DOM, если требуется
    if (options.dom) {
        await DOM.setup();
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

    let result
    
    // Запуск тестов
    if (options.parallel) {
        // console.log(chalk.gray(`[-] Running tests in parallel...`));
        result = await parallel(testQueue.getQueue(), options.maxWorkers);
    } else {
        // console.log(chalk.gray(`[-] Running tests in serial...`));
        result = await runner(testQueue.getQueue(), options);
    }

    const coverage = await session.post('Profiler.takePreciseCoverage');
    await session.post('Profiler.stopPreciseCoverage');

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
