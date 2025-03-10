#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {registerGlobals, run} from '../src/index.js';
import { startWatchMode } from '../src/watcher.js';
import chalk from 'chalk';
import {updateConfig} from "../src/config/index.js";
import {clearConsole} from "../src/helpers/console.js";
import { getProjectName } from '../src/helpers/project.js';
import pkg from '../package.json' with { type: "json" };

// Глобальная обработка ошибок
process.on('uncaughtException', (error) => {
    console.error(chalk.red(`\n❌ Unprocessed exception: ${error.message}`));
    console.error(chalk.gray(error.stack));
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red(`\n❌ Unprocessed promise reject: ${reason}`));
    process.exit(1);
});

// Обработка сигналов завершения
process.on('SIGINT', () => {
    console.log(chalk.yellow('\n\n⚠️ The testing process was interrupted by the user!'));
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log(chalk.yellow('\n\n⚠️ The testing process was interrupted by the system!'));
    process.exit(0);
});

try {
    clearConsole()

    console.log(`${chalk.bold("EasyTest")} ${chalk.bold.cyanBright(`v${pkg.version}`)}`)
    console.log(`-----------------------------------------------------------------`)
    console.log(`${chalk.gray("Copyright (c) 2024-2025 by")} ${chalk.bold.whiteBright("Serhii Pimenov <serhii@pimenov.com.ua>")}`)
    console.log(`${chalk.gray("You can support EasyTest by PayPal to")} ${chalk.bold.cyan("serhii@pimenov.com.ua")}`)
    console.log(`-----------------------------------------------------------------\n`)

    const argv = yargs(hideBin(process.argv))
        .option('watch', {
            alias: 'w',
            type: 'boolean',
            description: 'Run in observation mode'
        })
        .option('parallel', {
            alias: 'p',
            type: 'boolean',
            description: 'Run in parallel mode'
        })
        .option('dom', {
            alias: 'd',
            type: 'boolean',
            description: 'Enable DOM emulation'
        })
        .option('verbose', {
            alias: 'v',
            type: 'boolean',
            description: 'Detailed report'
        })
        .option('coverage', {
            alias: 'c',
            type: 'boolean',
            description: 'Code coverage report'
        })
        .option('include', {
            type: 'string',
            description: 'Test files switching templates'
        })
        .option('exclude', {
            type: 'string',
            description: 'Test file excluding templates'
        })
        .option('report-type', {
            type: 'string',
            description: 'Report Type [\'lcov\', \'html\', \'junit\']'
        })
        .option('report-dir', {
            type: 'string',
            description: 'Reports Directory'
        })
        .option('report-file', {
            type: 'string',
            description: 'Report File Name'
        })
        .option('init', {
            type: 'boolean',
            description: 'Create a configuration file'
        })
        .help()
        .argv;

    const root = process.cwd();

    const projectName = getProjectName(root);
    console.log(`${chalk.cyan('Project:')} ${chalk.bold(projectName)}\n`);

    if (argv.init) {
        const configFileName = argv.config || "easytest.json";
        const { createConfigFile } = await import('../src/config/index.js');
        createConfigFile(configFileName);
        process.exit(0);
    }

    global.config = {};
    updateConfig(argv);

    registerGlobals();

    if (argv.watch) {
        await startWatchMode(root, config);
    } else {
        await run(root, config);
    }
} catch (error) {
    console.error(chalk.red(`\n❌ Error when executing EasyTest: ${error.message}`));
    console.error(chalk.gray(error.stack));
    process.exit(1);
}
