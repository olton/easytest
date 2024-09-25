import { glob } from 'glob'
import { pathToFileURL } from 'url';
import fs from 'fs'
import { showTestsResults } from './result.js'
import 'global-jsdom/register'
import { JSDOM } from 'jsdom'
import { deepEqual } from './helpers/deep-equal.js'

const beforeEachFunctions = []
const afterEachFunctions = []
const beforeAllFunctions = []
const afterAllFunctions = []
const statsSuites = []
const statsSimpleTests = []

let currentTests = {
    name: 'Simple tests',
    it: []
}
let currentDescribe = {}
let itScope = {}
let passedTests = 0
let failedTests = 0

let expectedTests = 0

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
        await import(pathToFileURL(fs.realpathSync(file)).href)
    }

    showTestsResults({
        passed: passedTests,
        failed: failedTests,
        suites: statsSuites,
        simple: statsSimpleTests,
        config,
    })
}

export const dom = (html = ``, options = {}) => {
    return new JSDOM(html, options)
}

export function describe (name, fn) {
    currentDescribe = {
        name: name,
        it: [],
        startTime: process.hrtime(),
    }

    for(let fn1 of beforeAllFunctions) {
        fn1.apply(this)
    }

    fn.apply(this)

    for(let fn1 of afterAllFunctions) {
        fn1.apply(this)
    }

    const [seconds, nanoseconds] = process.hrtime(currentDescribe.startTime);
    currentDescribe.duration = (seconds * 1e9 + nanoseconds) / 1e6;
    statsSuites.push(currentDescribe)
}

export async function it (name, fn) {
    itScope = {
        name: name,
        expects: [],
        startTime: process.hrtime(),
    }

    for (let fn1 of beforeEachFunctions) {
        await fn1.apply(this)
    }

    if (fn.constructor.name === 'AsyncFunction') {
        await fn.apply(this);
    } else {
        fn.apply(this);
    }

    expectedTests++;

    for (let fn1 of afterEachFunctions) {
        await fn1.apply(this)
    }

    const [seconds, nanoseconds] = process.hrtime(itScope.startTime);
    itScope.duration = (seconds * 1e9 + nanoseconds) / 1e6;
    currentDescribe.it.push(itScope)
}

export async function test (name, fn) {
    itScope = {
        name: `Test ${name}`,
        expects: [],
        startTime: process.hrtime(),
    }

    for (let fn1 of beforeAllFunctions) {
        await fn1.apply(this)
    }

    if (fn.constructor.name === 'AsyncFunction') {
        await fn.apply(this);
    } else {
        fn.apply(this);
    }

    for (let fn1 of afterAllFunctions) {
        await fn1.apply(this)
    }

    const [seconds, nanoseconds] = process.hrtime(itScope.startTime);
    itScope.duration = (seconds * 1e9 + nanoseconds) / 1e6;
    currentTests.it.push(itScope)
    statsSimpleTests.push(currentTests)
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

export function expect (actual) {
    return {
        toBe: (expected) => {
            let result = deepEqual(actual, expected)

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBe ${expected}`,
                    actual,
                    expected,
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected object not equal to received`,
                    actual,
                    expected,
                    result,
                })
            }
        },
        toEqual: (expected) => {
            let result = actual == expected

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toEqual ${expected}`,
                    actual,
                    expected,
                    result,
                })
            } else {
                passedTests++
                itScope.expects.push({
                    name: `Expected ${expected} received ${actual}`,
                    actual,
                    expected,
                    result,
                })
            }
        },
        toMatch: (expected) => {
            let result = actual.match(expected)

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toMatch ${expected}`,
                    actual,
                    expected,
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected ${expected} received ${actual}`,
                    actual,
                    expected,
                    result,
                })
            }
        },
        toBeDefined: () => {
            let result = actual !== undefined

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeDefined`,
                    actual,
                    expected: 'defined',
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected defined var received ${actual}`,
                    actual,
                    expected: 'defined',
                    result,
                })
            }
        },
        toBeUndefined: () => {
            let result = actual === undefined

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeUndefined`,
                    actual,
                    expected: 'undefined',
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected undefined received ${actual}`,
                    actual,
                    expected: 'undefined',
                    result,
                })
            }
        },
        toBeNull: () => {
            let result = actual === null

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeNull`,
                    actual,
                    expected: 'null',
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected null received ${actual}`,
                    actual,
                    expected: 'null',
                    result,
                })
            }
        },
        toBeTruthy: () => {
            let result = actual === true

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeTruthy`,
                    actual,
                    expected: 'true',
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected true received ${actual}`,
                    actual,
                    expected: 'true',
                    result,
                })
            }
        },
        toBeFalsy: () => {
            let result = actual === false

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeFalsy`,
                    actual,
                    expected: 'false',
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected false received ${actual}`,
                    actual,
                    expected: 'false',
                    result,
                })
            }
        },
        toContain: (expected) => {
            let result = actual.includes(expected)

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} contain ${expected}`,
                    actual,
                    expected,
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected ${actual} contain ${expected}`,
                    actual,
                    expected,
                    result,
                })
            }
        },
        toBeGreaterThan: (expected) => {
            let result = actual > expected

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} > ${expected}`,
                    actual,
                    expected,
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected the ${actual} greater than ${expected}`,
                    actual,
                    expected,
                    result,
                })
            }
        },
        toBeLessThan: (expected) => {
            let result = actual < expected

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} > ${expected}`,
                    actual,
                    expected,
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected the ${actual} less than ${expected}`,
                    actual,
                    expected,
                    result,
                })
            }
        },
        toThrow: () => {
            let result = false
            try {
                actual()
            } catch (e) {
                result = true
            }

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `The code threw an Exception`,
                    actual,
                    expected: 'throw',
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `The code is expected to throw an Exception`,
                    actual,
                    expected: 'throw',
                    result,
                })
            }
        },
        toThrowError: (expected) => {
            let result = false
            let message = ``
            try {
                actual()
            } catch (e) {
                message = e.message
                if (e.message === expected) {
                    result = true
                }
            }

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `The error message received correctly`,
                    actual,
                    expected,
                    result,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `The error message is expected to be "${expected}" but received "${message}"`,
                    actual,
                    expected,
                    result,
                })
            }
        },
        toBeArrayEqual: (expected) => {
            if (actual.length !== expected.length) {
                failedTests++
                itScope.expects.push({
                    name: `Expected [${expected.join(',')}] received [${actual.join(',')}]`,
                    actual,
                    expected,
                    result: false,
                })
                return
            }

            for (let i = 0; i < actual.length; i++) {
                if (actual[i] !== expected[i]) {
                    failedTests++
                    itScope.expects.push({
                        name: `Expected [${expected.join(',')}] received [${actual.join(',')}]`,
                        actual,
                        expected,
                        result: false,
                    })
                    return
                }
            }

            passedTests++
            itScope.expects.push({
                name: `Expect ${actual} to be equal ${expected}`,
                actual,
                expected,
                result: true,
            })
        },
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
