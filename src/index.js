import { glob } from 'glob';
import { pathToFileURL } from 'url';
import { realpathSync } from 'fs';
import inspector from 'inspector/promises';
import { coverageFilter, displayReport } from './core/coverage.js';
import {runner} from "./core/runner.js";
import {parallel} from "./core/parallel-runner.js";
import {testQueue} from './core/queue.js';
import { hooksRegistry } from './core/hooks.js';
import { DOM } from './core/registry.js';

// Экспортируем публичные API
export { Expect, ExpectError } from "./expects/expect.js";
export * from './core/registry.js';
export { coverageFilter, generateReport, displayReport } from './core/coverage.js';

// Главная функция запуска тестов
export const run = async (root, options = {}) => {
    options.root = root;

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
        displayReport(filteredCoverage);
        
        if (options.reportType === 'lcov') {
            const createReport = await import('./reporters/lcov/index.js');
            createReport.default(options.reportFile || 'easy-report.lcov', filteredCoverage);
        } else if (options.reportType === 'html') {
            const createReport = await import('./reporters/html/index.js');
            createReport.default(options.reportFile || 'easy-report.html', global.testResults,  filteredCoverage);
        }
    }
    
    return global.testResults;
};