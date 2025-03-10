#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {registerGlobals, run} from '../src/index.js';
import { startWatchMode } from '../src/watcher.js';
import chalk from 'chalk';
import {updateConfig} from "../src/config/index.js";
import {clearConsole} from "../src/helpers/console.js";
import { getProjectName } from '../src/helpers/project.js';

clearConsole()

console.log(`${chalk.bold("EasyTest Runner")}`)
console.log(`-----------------------------------------------------------------`)
console.log(`Copyright (c) 2024-2025 by Serhii Pimenov <serhii@pimenov.com.ua>`)
console.log(`You can support EasyTest by PayPal to serhii@pimenov.com.ua`)
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

// Регистрация глобальных функций и объектов
registerGlobals();

// В зависимости от наличия флага watch используем startWatchMode или обычный run
if (argv.watch) {
    startWatchMode(root, config).catch(err => {
        console.error('Error in watching mode:', err);
        process.exit(1);
    });
} else {
    run(root, config).then().catch(err => {
        console.error('Error when starting tests:', err);
        process.exit(1);
    });
}
