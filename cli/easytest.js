#!/usr/bin/env node

import { run } from '../src/index.js';

const args = process.argv.slice(2);

await run(process.cwd(), args);