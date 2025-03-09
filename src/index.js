import { glob } from 'glob';
import { pathToFileURL } from 'url';
import { realpathSync } from 'fs';
import { exit } from 'node:process';
import inspector from 'inspector/promises';
import { coverageFilter, displayReport } from './core/coverage.js';
import { updateConfig } from "./config/index.js";
import {runner} from "./core/runner.js";
import {parallel} from "./core/parallel-runner.js";
import { testQueue } from './core/queue.js';
import { hooksRegistry } from './core/hooks.js';
import { initTestDirectory, saveTestResults } from './helpers/file.js';
import { registerGlobals } from './core/registry.js';
import { DOM } from './core/registry.js';
import chalk from 'chalk';

// Экспортируем публичные API
export { Expect, ExpectError } from "./expects/expect.js";
export * from './core/registry.js';
export { coverageFilter, generateReport, displayReport } from './core/coverage.js';

// Главная функция запуска тестов
export const run = async (root, args) => {
    // Инициализация глобальных переменных
    global.config = {};
    global.passed = {};

    // Инициализация директории для тестов и загрузка данных о прошлых запусках
    const { passedTestsFile, passed } = initTestDirectory();
    global.passed = passed;

    // Обновление конфигурации
    updateConfig(args);
    config.root = root;

    // Настройка DOM, если требуется
    if (config.dom) {
        await DOM.setup();
    }

    // Инициализация сессии для измерения покрытия кода
    let session;
    if (config.coverage) {
        session = new inspector.Session();
        session.connect();

        await session.post('Profiler.enable');
        await session.post('Profiler.startPreciseCoverage', {
            callCount: true,
            detailed: true
        });
    }

    // Регистрация глобальных функций и объектов
    registerGlobals();

    // Поиск файлов тестов
    let files = await glob(config.include, { ignore: config.exclude });

    // Загрузка и выполнение тестовых файлов
    for (const file of files) {
        testQueue.setCurrentFile(file);
        hooksRegistry.clearFileLevelHooks();

        const fileUrl = pathToFileURL(realpathSync(file)).href;
        await import(fileUrl);
    }

    let result
    
    // Запуск тестов
    if (config.parallel) {
        console.log(chalk.gray(`[-] Running tests in parallel...`));
        result = await parallel(testQueue.getQueue(), config.maxWorkers || 4);
    } else {
        console.log(chalk.gray(`[-] Running tests in serial...`));
        result = await runner(testQueue.getQueue());
    }

    // Обработка покрытия кода, если включено
    if (config.coverage) {
        const coverage = await session.post('Profiler.takePreciseCoverage');
        await session.post('Profiler.stopPreciseCoverage');

        const filteredCoverage = coverageFilter(coverage);
        displayReport(filteredCoverage);

        if (config.reportType === 'lcov') {
            const createReport = await import('./reporters/lcov/index.js');
            createReport.default(config.reportFile, filteredCoverage);
        }
    }

    // Сохранение результатов тестов
    saveTestResults(passedTestsFile, global.passed);

    // Завершение процесса с соответствующим кодом выхода
    exit(result > 0 ? 1 : 0);
};