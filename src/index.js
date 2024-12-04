import {glob} from 'glob'
import {pathToFileURL} from 'url';
import {realpathSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs'
import {join} from 'path'
import {runner} from "./runner.js";
import {exit} from 'node:process';
import {expect as expectFn} from './expect.js';
import inspector from 'inspector/promises'
import {coverageFilter, displayReport} from './coverage.js'
import {parentFunc} from "./helpers/parent-func.js";
import {updateConfig} from "./config.js";
import mockFn from "./mock.js"
import {Browser} from "./browser.js"

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

global.config = {}
global.passed = {};

export {Expect, ExpectError} from "./expect.js"
export const expect = expectFn
export const mock = mockFn
export const B = Browser

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export const getFileUrl = (file) => pathToFileURL(realpathSync(file)).href

export {coverageFilter, generateReport, displayReport} from './coverage.js'

import {setup as setupDom, bye as byeDom, js, css, html} from "./dom.js"
import {getFileHash} from "./helpers/hasher.js";
import chalk from "chalk";

export const DOM = {
    setup: setupDom,
    bye: byeDom,
    js,
    css,
    html,
}

export const run = async (root, args) => {
    const easyTestDir = join(process.cwd(), '.easytest');
    if (!existsSync(easyTestDir)) {
        mkdirSync(easyTestDir);
    }
    const easyTestPassed = join(easyTestDir, 'objects.json');
    if (existsSync(easyTestPassed)) {
        const passed = JSON.parse(readFileSync(easyTestPassed, 'utf-8'));
        for (const [key, value] of Object.entries(passed)) {
            global.passed[key] = value;
        }
    }

    updateConfig(args)

    config.root = root

    if (config.dom) {
        await setupDom()
    }

    let session

    if (config.coverage) {
        session = new inspector.Session()
        session.connect()

        await session.post('Profiler.enable')
        await session.post('Profiler.startPreciseCoverage', {
            callCount: true,
            detailed: true
        })
    }

    let files = await glob(config.include, {ignore: config.exclude})

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

        const fileUrl = pathToFileURL(realpathSync(file)).href
        await import(fileUrl)
    }

    const result = await runner(queue)

    if (config.coverage) {
        const coverage = await session.post('Profiler.takePreciseCoverage')
        await session.post('Profiler.stopPreciseCoverage')

        const filteredCoverage = coverageFilter(coverage)

        displayReport(filteredCoverage)

        if (config.reportType === 'lcov') {
            const createReport = await import('./reporters/lcov/index.js')
            createReport.default(config.reportFile, filteredCoverage)
        }
    }

    writeFileSync(easyTestPassed, JSON.stringify(global.passed, null, 2));
    
    exit(result > 0 ? 1 : 0)
}

export function describe(name, fn) {
    const testObject = queue.get(currentTestFile)

    currentDescribe = {
        name: name,
        it: [],
        beforeAll: [],
        afterAll: [],
        context: this,
    }

    for (let fn1 of beforeAllFileFunctions) {
        currentDescribe.beforeAll.push(fn1.bind(this))
    }

    fn.apply(this)

    for (let fn1 of beforeAllSuiteFunctions) {
        currentDescribe.beforeAll.push(fn1.bind(this))
    }

    for (let fn1 of afterAllSuiteFunctions) {
        currentDescribe.afterAll.push(fn1.bind(this))
    }

    for (let fn1 of afterAllFileFunctions) {
        currentDescribe.afterAll.push(fn1.bind(this))
    }

    testObject.describes.push(currentDescribe)
    queue.set(currentTestFile, testObject)

    beforeAllSuiteFunctions.length = 0
    afterAllSuiteFunctions.length = 0
    beforeEachSuiteFunctions.length = 0
    afterEachSuiteFunctions.length = 0
}

export async function it(name, fn) {
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

export async function test(name, fn) {
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

export function beforeEach(fn) {
    if (parentFunc() === 'describe') {
        beforeEachSuiteFunctions.push(fn)
    } else {
        beforeEachFileFunctions.push(fn)
    }
}

export function afterEach(fn) {
    if (parentFunc() === 'describe') {
        afterEachSuiteFunctions.push(fn)
    } else {
        afterEachFileFunctions.push(fn)
    }
}

export function beforeAll(fn) {
    if (parentFunc() === 'describe') {
        beforeAllSuiteFunctions.push(fn)
    } else {
        beforeAllFileFunctions.push(fn)
    }
}

export function afterAll(fn) {
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
global.mock = mock
global.delay = delay
global.getFileUrl = getFileUrl
global.DOM = DOM
global.B = B