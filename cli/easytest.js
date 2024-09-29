#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from '../src/index.js';
import chalk from "chalk";

const log = console.log
const args = yargs(hideBin(process.argv)).argv;

log(`${chalk.bold("EasyTest Runner")}`)
log(`------------------------------------`)
log(`Copyright (c) 2024 by Serhii Pimenov <serhii@pimenov.com.ua>`)
log(`You can support EasyTest by PayPal to serhii@pimenov.com.ua`)
log(`------------------------------------`)

await run(process.cwd(), args);