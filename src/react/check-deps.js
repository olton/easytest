import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const checkReactDependencies = (projectRoot) => {
    try {
        const packageJsonPath = path.join(projectRoot, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.error(chalk.red('💀 Cannot find package.json in the project root'));
            return false;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const dependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies
        };

        const missingDeps = [];

        if (!dependencies.react) {
            missingDeps.push('react');
        }

        if (!dependencies['react-dom']) {
            missingDeps.push('react-dom');
        }

        if (missingDeps.length > 0) {
            console.error( chalk.red(`💀 Missing required dependencies for React testing: ${missingDeps.join(', ')}`));
            console.log(chalk.yellow(`🤖 Please install them using: npm install ${missingDeps.join(' ')}`));
            return false;
        }

        return true;
    } catch (error) {
        console.error(chalk.red(`💀 Error checking React dependencies: ${error.message}`));
        return false;
    }
};