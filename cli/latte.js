#!/usr/bin/env node

import { registerGlobals, run } from '../src/index.js';
import { startWatchMode } from '../src/watcher.js';
import chalk from 'chalk';
import { processArgv, updateConfig } from "../src/config/index.js";
import { clearConsole } from "../src/helpers/console.js";
import { getProjectName } from '../src/helpers/project.js';
import { banner } from '../src/helpers/banner.js';
import { dirname, resolve } from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { register } from 'node:module';
import { registerGlobalEvents } from '../src/core/registry.js';
import { configureJsxSupport } from '../src/config/jsx.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
    registerGlobalEvents();
    
    const argv = processArgv();
    const root = process.cwd();

    clearConsole()
    banner();

    const projectName = getProjectName(root);
    console.log(`${chalk.cyan('Executing tests for project:')} ${chalk.bold(projectName)}\n`);
    
    if (argv.init) {
        const configFileName = argv.config || "latte.json";
        const { createConfigFile } = await import('../src/config/index.js');
        createConfigFile(configFileName);
        process.exit(0);
    }

    if (argv.loader) {
        console.log(chalk.yellow(`🤖 Experimental loader mode is enabled!`));
        const resolverPath = resolve(__dirname, '../src/resolver/index.js');
        register(pathToFileURL(resolverPath).href);
    }
    
    // global.config = {};
    updateConfig(argv);

    if (argv.react) {
        const jsxSupported = configureJsxSupport(root);

        if (!jsxSupported) {
            console.log(chalk.yellow('🤖 JSX/TSX support might be limited without proper Babel configuration!'));
        }
    }

    registerGlobals();

    if (argv.watch) {
        await startWatchMode(root, config);
    } else {
        await run(root, config);
    }
} catch (error) {
    if (error.message.includes('Directory import') && error.message.includes('is not supported')
    ) {
        console.error(chalk.red(`\n💀 Import of the Directory has been identified!`));
        console.error(chalk.yellow(`Please change import from: import {} from './directory'`));
        console.error(chalk.green(`To: import {} from './directory/index.js'`));
        console.error(chalk.cyan(`Or create package.json in this Directory with Field "exports"\n`));
        console.error(`${chalk.gray("Original message:")} ${error.message}\n`)
    } else {
        console.error(chalk.red(`\n💀 Latte executing stopped with message: ${error.message}`));
        console.error(chalk.gray(error.stack));
        process.exit(1);
    }
}
