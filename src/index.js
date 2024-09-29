import { glob } from 'glob'
import { pathToFileURL } from 'url';
import fs from 'fs'
import 'global-jsdom/register'
import { JSDOM } from 'jsdom'
import {runner} from "./runner.js";
import { exit } from 'node:process';
import { expect as expectFn } from './expect.js';
import inspector from 'inspector/promises'
import { createReport } from './coverage.js'
import chalk from "chalk";
import {parentFunc} from "./helpers/parent-func.js";
import {updateConfig} from "./config.js";

const log = console.log

const beforeEachFileFunctions = []
const afterEachFileFunctions = []
const beforeEachSuiteFunctions = []
const afterEachSuiteFunctions = []
const beforeAllFileFunctions = []
const afterAllFileFunctions = []
const beforeAllSuiteFunctions = []
const afterAllSuiteFunctions = []

let currentDescribe = {}
let itScope = {}
let currentTestFile = ''

let queue = new Map()

const config = {}

export const run = async (root, args) => {
    updateConfig(config, args)

    const session  = new inspector.Session()
    session.connect()
    await session.post('Profiler.enable')
    await session.post('Profiler.startPreciseCoverage', {
        callCount: true,
        detailed: true
    })

    let files = await glob(config.include, { ignore: config.exclude })

    for (const file of files) {
        currentTestFile = file

        queue.set(file, {
            describes: [],
            tests: [],
            beforeAll: [],
            afterAll: [],
        })

        await import(pathToFileURL(fs.realpathSync(file)).href)

        beforeAllFileFunctions.length = 0
        afterAllFileFunctions.length = 0
    }

    const result = await runner(queue, {
        verbose: config.verbose,
        test: config.test,
    })

    const coverage = await session.post('Profiler.takePreciseCoverage')
    await session.post('Profiler.stopPreciseCoverage')

    if (config.coverage) createReport(coverage, root)

    exit(result)
}

export const DOM = (html = ``, options = {}) => {
    return new JSDOM(html, options)
}

export const expect = expectFn

export function describe (name, fn) {
    const testObject = queue.get(currentTestFile)

    currentDescribe = {
        name: name,
        it: [],
        beforeAll: [],
        afterAll: [],
        context: this,
    }

    for(let fn1 of beforeAllFileFunctions) {
        currentDescribe.beforeAll.push(fn1.bind(this))
    }

    fn.apply(this)

    for(let fn1 of beforeAllSuiteFunctions) {
        currentDescribe.beforeAll.push(fn1.bind(this))
    }

    for(let fn1 of afterAllSuiteFunctions) {
        currentDescribe.afterAll.push(fn1.bind(this))
    }

    for(let fn1 of afterAllFileFunctions) {
        currentDescribe.afterAll.push(fn1.bind(this))
    }

    testObject.describes.push(currentDescribe)
    queue.set(currentTestFile, testObject)

    beforeAllSuiteFunctions.length = 0
    afterAllSuiteFunctions.length = 0
    beforeEachSuiteFunctions.length = 0
    afterEachSuiteFunctions.length = 0
}

export async function it (name, fn) {
    itScope = {
        name,
        expects: {},
        fn: fn.bind(currentDescribe.context),
        beforeEach: [],
        afterEach: [],
        startTime: process.hrtime(),
    }

    for (let fn1 of beforeEachFileFunctions) {
        itScope.beforeEach.push(fn1.bind(this))
    }
    for (let fn1 of beforeEachSuiteFunctions) {
        itScope.beforeEach.push(fn1.bind(this))
    }

    for (let fn1 of afterEachSuiteFunctions) {
        itScope.afterEach.push(fn1.bind(this))
    }
    for (let fn1 of afterEachFileFunctions) {
        itScope.afterEach.push(fn1.bind(this))
    }

    currentDescribe.it.push(itScope)
}

export async function test (name, fn) {
    const testObject = queue.get(currentTestFile)

    itScope = {
        name,
        expects: {},
        fn: fn.bind(this),
        beforeEach: [],
        afterEach: [],
        startTime: process.hrtime(),
    }

    testObject.tests.push(itScope)
}

export function beforeEach (fn) {
    if (parentFunc() === 'describe') {
        beforeEachSuiteFunctions.push(fn)
    } else {
        beforeEachFileFunctions.push(fn)
    }
}

export function afterEach (fn) {
    if (parentFunc() === 'describe') {
        afterEachSuiteFunctions.push(fn)
    } else {
        afterEachFileFunctions.push(fn)
    }
}

export function beforeAll (fn) {
    if (parentFunc() === 'describe') {
        beforeAllSuiteFunctions.push(fn)
    } else {
        beforeAllFileFunctions.push(fn)
    }
}

export function afterAll (fn) {
    if (parentFunc() === 'describe') {
        afterAllSuiteFunctions.push(fn)
    } else {
        afterAllFileFunctions.push(fn)
    }
}

global.describe = describe
global.it = it
global.test = test
global.expect = expect
global.afterEach = afterEach
global.beforeEach = beforeEach
global.beforeAll = beforeAll
global.afterAll = afterAll
