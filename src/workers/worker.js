import { parentPort, workerData } from 'worker_threads';
import { pathToFileURL } from 'url';
import { realpathSync } from 'fs';
import inspector from 'inspector/promises';
import { DOM } from '../core/registry.js';
import { updateConfig } from '../config/index.js';
import { runner } from '../core/runner.js';
import { testQueue } from '../core/queue.js';
import { hooksRegistry } from '../core/hooks.js';
import { registerGlobals } from '../core/registry.js';
import { coverageFilter } from '../core/coverage.js';

// Получаем данные о файле теста из основного потока
const { file, config: workerConfig } = workerData;

// Асинхронное выполнение тестов в отдельном потоке
async function runTest() {
    // Инициализация глобальных объектов
    global.config = workerConfig;
    global.passed = {};

    // Регистрируем глобальные функции и переменные
    registerGlobals();

    // Настройка DOM если требуется
    if (config.dom) {
        await DOM.setup();
    }

    // Инициализация сессии для измерения покрытия кода
    let session;
    let coverage = null;
    session = new inspector.Session();
    session.connect();

    await session.post('Profiler.enable');
    await session.post('Profiler.startPreciseCoverage', {
        callCount: true,
        detailed: true
    });

    // Подготавливаем очередь для тестируемого файла
    testQueue.setCurrentFile(file);
    hooksRegistry.clearFileLevelHooks();

    // Импортируем тестовый файл
    const fileUrl = pathToFileURL(realpathSync(file)).href;
    await import(fileUrl);

    // Создаем временную очередь только для этого файла
    const fileQueue = new Map();
    fileQueue.set(file, testQueue.getQueue().get(file));

    // Запускаем тесты для этого файла
    const result = await runner(fileQueue);

    // Собираем информацию о покрытии кода
    const coverageData = await session.post('Profiler.takePreciseCoverage');
    await session.post('Profiler.stopPreciseCoverage');
    coverage = coverageFilter(coverageData);

    // Очищаем DOM, если он был инициализирован
    if (config.dom) {
        await DOM.bye();
    }

    // Отправляем результат обратно в основной поток
    parentPort.postMessage({
        file,
        result,
        coverage
    });
}

// Обработка ошибок
process.on('unhandledRejection', (reason) => {
    parentPort.postMessage({
        file,
        error: {
            message: reason.message,
            stack: reason.stack
        },
        result: 1
    });
    process.exit(1);
});

// Запускаем выполнение тестов
runTest().catch(error => {
    parentPort.postMessage({
        file,
        error: {
            message: error.message,
            stack: error.stack
        },
        result: 1
    });
    process.exit(1);
});