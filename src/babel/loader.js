// custom-loader.js
import { transformSync } from '@babel/core';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export async function load(url, context, defaultLoad) {
    // Отримуємо шлях до файлу
    const filePath = fileURLToPath(url);

    // Якщо це JSX або TSX файл
    if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.ts')) {
        // Читаємо вміст файлу
        const source = fs.readFileSync(filePath, 'utf-8');

        // Трансформуємо JSX за допомогою Babel
        const transformed = transformSync(source, {
            filename: filePath,
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                ['@babel/preset-react', { runtime: 'automatic' }],
                filePath.endsWith('.tsx') ? '@babel/preset-typescript' : null
            ].filter(Boolean),
            babelrc: true,
            configFile: true
        });

        // Повертаємо трансформований код як ESM
        return {
            format: 'module',
            source: transformed.code,
            shortCircuit: true
        };
    }

    // Для інших файлів використовуємо стандартний завантажувач
    return defaultLoad(url, context, defaultLoad);
}