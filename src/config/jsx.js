import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export const configureJsxSupport = (projectRoot) => {
    // Шукаємо babel конфігурацію в проекті користувача
    const possibleBabelConfigs = [
        '.babelrc',
        '.babelrc.js',
        '.babelrc.json',
        'babel.config.js',
        'babel.config.json'
    ];

    let babelConfigFound = false;

    for (const configFile of possibleBabelConfigs) {
        const configPath = path.join(projectRoot, configFile);
        if (fs.existsSync(configPath)) {
            babelConfigFound = true;
            break;
        }
    }

    if (!babelConfigFound) {
        console.warn(chalk.yellow('🥤 No Babel configuration found for transpiling JSX/TSX.'));
        console.warn(chalk.yellow('🥤 You may need to create a Babel configuration for proper React testing.'));
    }

    // Перевіряємо наявність необхідних пресетів для transpiling JSX/TSX
    try {
        const packageJsonPath = path.join(projectRoot, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        const requiredPresets = [
            '@babel/preset-react',
            '@babel/preset-typescript' // для TSX
        ];

        const missingPresets = requiredPresets.filter(preset => !deps[preset]);

        if (missingPresets.length > 0) {
            console.warn(chalk.yellow(`🥤 React testing may require these Babel presets: ${missingPresets.join(', ')}`));
        }

    } catch (error) {
        console.error(chalk.red(`🥤 Error checking Babel presets: ${error.message}`));
    }

    return babelConfigFound;
};