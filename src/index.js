import { glob } from 'glob'
import { pathToFileURL } from 'url';
import fs from 'fs'
import 'global-jsdom/register'
import { JSDOM } from 'jsdom'
import {runner} from "./runner.js";
import { exit } from 'node:process';
import { expect } from './expect.js';

const beforeEachFunctions = []
const afterEachFunctions = []
const beforeAllFunctions = []
const afterAllFunctions = []
let currentDescribe = {}
let itScope = {}
let currentTestFile = ''

let queue = new Map()

const configFileName = 'easytest.config.json'

const config = {
    "include": ["**/*.spec.{t,j}s", "**/*.spec.{t,j}sx", "**/*.test.{t,j}s", "**/*.test.{t,j}sx"],
    "exclude": ["node_modules"],
}

if (fs.existsSync(configFileName)) {
    const userConfig = JSON.parse(fs.readFileSync(configFileName, 'utf-8'))
    Object.assign(config, userConfig)
}

export const runTests = async () => {
    let files = await glob(config.include, { ignore: config.exclude })

    for (const file of files) {
        currentTestFile = file
        queue.set(file, {
            describes: [],
            tests: [],
        })
        await import(pathToFileURL(fs.realpathSync(file)).href)
    }

    const result = await runner(queue)
    exit(result)
}

export const DOM = (html = ``, options = {}) => {
    return new JSDOM(html, options)
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

    for(let fn1 of beforeAllFunctions) {
        currentDescribe.beforeAll.push(fn1.bind(this))
    }

    fn.apply(this)

    for(let fn1 of afterAllFunctions) {
        currentDescribe.afterAll.push(fn1.bind(this))
    }

    testObject.describes.push(currentDescribe)
    queue.set(currentTestFile, testObject)
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

    for (let fn1 of beforeEachFunctions) {
        itScope.beforeEach.push(fn1.bind(this))
    }

    for (let fn1 of afterEachFunctions) {
        itScope.afterEach.push(fn1.bind(this))
    }

    currentDescribe.it.push(itScope)
}

export function test (name, fn) {
    const testObject = queue.get(currentTestFile)

    itScope = {
        name,
        expects: {},
        fn: fn.bind(this),
        startTime: process.hrtime(),
    }

    testObject.tests.push(itScope)
}

export let beforeEach = (fn) => {
    beforeEachFunctions.push(fn)
}

export let afterEach = (fn) => {
    afterEachFunctions.push(fn)
}

export let beforeAll = (fn) => {
    beforeAllFunctions.push(fn)
}

export let afterAll = (fn) => {
    afterAllFunctions.push(fn)
}

global.describe = describe
global.it = it
global.test = test
global.expect = expect
global.afterEach = afterEach
global.beforeEach = beforeEach
global.beforeAll = beforeAll
global.afterAll = afterAll
