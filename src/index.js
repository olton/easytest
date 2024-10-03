import { glob } from 'glob'
import { pathToFileURL } from 'url';
import fs from 'fs'
import {setup as setupDom, clean, flash, evalJS, js, css, html} from './dom.js'
import {runner} from "./runner.js";
import { exit } from 'node:process';
import { expect as expectFn } from './expect.js';
import inspector from 'inspector/promises'
import {displayReport} from './coverage.js'
import {parentFunc} from "./helpers/parent-func.js";
import {updateConfig} from "./config.js";
import mockFn from "./mock.js"

const beforeEachFileFunctions = []
const afterEachFileFunctions = []
const beforeEachSuiteFunctions = []
const afterEachSuiteFunctions = []
const beforeAllFileFunctions = []
const afterAllFileFunctions = []
const beforeAllSuiteFunctions = []
const afterAllSuiteFunctions = []

let currentDescribe = {}
let currentTestFile = ''

let queue = new Map()

const config = {}

export { Expect, ExpectError } from "./expect.js"
export const expect = expectFn
export const mock = mockFn

export const DOM = {
    setup: setupDom,
    clean,
    flash,
    eval: evalJS,
    js,
    css,
    html,
}

setupDom()

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const run = async (root, args) => {
    updateConfig(config, args)

    let session

    if (config.coverage) {
        session  = new inspector.Session()
        session.connect()

        await session.post('Profiler.enable')
        await session.post('Profiler.startPreciseCoverage', {
            callCount: true,
            detailed: true
        })
    }

    let files = await glob(config.include, { ignore: config.exclude })

    for (const file of files) {
        currentTestFile = file

        beforeAllFileFunctions.length = 0
        afterAllFileFunctions.length = 0
        beforeEachFileFunctions.length = 0
        afterEachFileFunctions.length = 0

        queue.set(file, {
            describes: [],
            tests: [],
            beforeAll: [],
            afterAll: [],
        })

        await import(pathToFileURL(fs.realpathSync(file)).href)
    }

    const result = await runner(queue, {
        verbose: config.verbose,
        test: config.test,
    })

    if (config.coverage) {
        const coverage = await session.post('Profiler.takePreciseCoverage')
        await session.post('Profiler.stopPreciseCoverage')

        displayReport(coverage, root)
        if (config.report.type === 'lcov') {
            const createReport = await import('./reporters/lcov/index.js')
            createReport.default(coverage, config, root)
        }
    }

    exit(result)
}

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
    const testScope = {
        name,
        expects: {},
        fn: fn.bind(currentDescribe.context),
        beforeEach: [],
        afterEach: []
    }

    for (let fn1 of beforeEachFileFunctions) {
        testScope.beforeEach.push(fn1.bind(this))
    }
    for (let fn1 of beforeEachSuiteFunctions) {
        testScope.beforeEach.push(fn1.bind(this))
    }

    for (let fn1 of afterEachSuiteFunctions) {
        testScope.afterEach.push(fn1.bind(this))
    }
    for (let fn1 of afterEachFileFunctions) {
        testScope.afterEach.push(fn1.bind(this))
    }

    currentDescribe.it.push(testScope)
}

export async function test (name, fn) {
    const testObject = queue.get(currentTestFile)

    const testScope = {
        name,
        expects: {},
        fn: fn.bind(this),
        beforeEach: [],
        afterEach: []
    }

    for (let fn1 of beforeEachFileFunctions) {
        testScope.beforeEach.push(fn1.bind(this))
    }
    for (let fn1 of afterEachFileFunctions) {
        testScope.afterEach.push(fn1.bind(this))
    }

    testObject.tests.push(testScope)
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
global.mocker = mock
global.delay = delay