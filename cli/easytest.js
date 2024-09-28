#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from '../src/index.js';

const args = yargs(hideBin(process.argv)).argv;

await run(process.cwd(), args);