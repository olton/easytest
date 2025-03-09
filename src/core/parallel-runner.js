import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем правильный путь к worker.js относительно текущего модуля
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workerPath = path.join(__dirname, '..', 'workers', 'worker.js');

export async function parallel(testQueue, maxWorkers = 4) {
    const files = Array.from(testQueue.keys());
    const chunks = [];
    let failedTests = 0;
    let coverage = [];

    // Разделяем файлы на группы для параллельного запуска
    for (let i = 0; i < files.length; i += maxWorkers) {
        chunks.push(files.slice(i, i + maxWorkers));
    }

    // Выполняем тесты для каждого чанка
    for (const chunk of chunks) {
        const workerPromises = chunk.map(file => {
            return new Promise((resolve, reject) => {
                const worker = new Worker(workerPath, {
                    workerData: {
                        file,
                        config: global.config
                    }
                });

                worker.on('message', (data) => {
                    if (data.error) {
                        console.error(`Error in file ${file}:`, data.error.message);
                        console.error(data.error.stack);
                    }

                    if (data.coverage) {
                        coverage.push(data.coverage);
                    }

                    resolve(data.result || 0);
                });

                worker.on('error', (err) => {
                    console.error(`Worker error for file ${file}:`, err);
                    reject(err);
                });

                worker.on('exit', (code) => {
                    if (code !== 0) {
                        reject(new Error(`Worker for ${file} stopped with exit code ${code}`));
                    }
                });
            });
        });

        // Ждем завершения всех тестов в текущем чанке
        const results = await Promise.all(workerPromises);
        failedTests += results.reduce((sum, val) => sum + val, 0);
    }

    // Возвращаем количество проваленных тестов и данные о покрытии
    return {
        failedTests,
        coverage
    };
}