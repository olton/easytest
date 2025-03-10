#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {registerGlobals, run} from '../src/index.js';
import { startWatchMode } from '../src/watcher.js';
import chalk from 'chalk';
import {updateConfig} from "../src/config/index.js";
import {clearConsole} from "../src/helpers/console.js";

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
    .option('include', {
        alias: 'i',
        type: 'string',
        description: 'Test files switching templates'
    })
    .option('exclude', {
        alias: 'e',
        type: 'string',
        description: 'Test file excluding templates'
    })
    .option('dom', {
        alias: 'd',
        type: 'boolean',
        description: 'Enable DOM support'
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Detailed conclusion'
    })
    .option('coverage', {
        alias: 'c',
        type: 'boolean',
        description: 'Code coverage report'
    })
    .option('report-type', {
        alias: 'r',
        type: 'string',
        choices: ['lcov', 'html'],
        default: 'lcov',
        description: 'Report Type'
    })
    .option('report-dir', {
        alias: 'a',
        type: 'string',
        description: 'Reports Directory'
    })
    .option('report-file', {
        alias: 'f',
        type: 'string',
        description: 'Report File Name'
    })
    .help()
    .argv;

const root = process.cwd();

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
