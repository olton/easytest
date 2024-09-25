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

export function it (name, fn) {
    itScope = {
        name: name,
        expects: [],
        startTime: process.hrtime(),
    }

    for (let fn1 of beforeEachFunctions) {
        fn1.apply(this)
    }

    fn.apply(this)

    for (let fn1 of afterEachFunctions) {
        fn1.apply(this)
    }

    const [seconds, nanoseconds] = process.hrtime(itScope.startTime);
    itScope.duration = (seconds * 1e9 + nanoseconds) / 1e6;
    currentDescribe.it.push(itScope)
}

export function test (name, fn) {
    itScope = {
        name: `Test ${name}`,
        expects: [],
        startTime: process.hrtime(),
    }

    for (let fn1 of beforeAllFunctions) {
        fn1.apply(this)
    }

    fn.apply(this)

    for (let fn1 of afterAllFunctions) {
        fn1.apply(this)
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
            let result = false

            if (typeof actual === 'object' && typeof expected === 'object') {
                const actualKeys = Object.keys(actual)
                const expectedKeys = Object.keys(expected)
                if (actualKeys.length === expectedKeys.length) {
                    for (const key of actualKeys) {
                        if (actual[key] === expected[key]) {
                            result = true
                        } else {
                            result = false
                            break
                        }
                    }
                }
            } else if (Array.isArray(actual)) {
                if (actual.length === expected.length) {
                    for (let i = 0; i < actual.length; i++) {
                        if (actual[i] === expected[i]) {
                            result = true
                        } else {
                            result = false
                            break
                        }
                    }
                }
            } else {
                result = actual === expected
            }

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBe ${expected}`,
                    actual,
                    expected,
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected ${expected} received ${actual}`,
                    actual,
                    expected,
                    result: false,
                })
            }
        },
        toEqual: (expected) => {
            if (actual == expected) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toEqual ${expected}`,
                    actual,
                    expected,
                    result: true,
                })
            } else {
                passedTests++
                itScope.expects.push({
                    name: `Expected ${expected} received ${actual}`,
                    actual,
                    expected,
                    result: false,
                })
            }
        },
        toBeDefined: () => {
            if (actual !== undefined) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeDefined`,
                    actual,
                    expected: 'defined',
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected defined var received ${actual}`,
                    actual,
                    expected: 'defined',
                    result: false,
                })
            }
        },
        toBeUndefined: () => {
            if (actual === undefined) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeUndefined`,
                    actual,
                    expected: 'undefined',
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected undefined received ${actual}`,
                    actual,
                    expected: 'undefined',
                    result: false,
                })
            }
        },
        toBeNull: () => {
            if (actual === null) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeNull`,
                    actual,
                    expected: 'null',
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected null received ${actual}`,
                    actual,
                    expected: 'null',
                    result: false,
                })
            }
        },
        toBeTruthy: () => {
            if (actual === true) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeTruthy`,
                    actual,
                    expected: 'true',
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected true received ${actual}`,
                    actual,
                    expected: 'true',
                    result: false,
                })
            }
        },
        toBeFalsy: () => {
            if (actual === false) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} toBeFalsy`,
                    actual,
                    expected: 'false',
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected false received ${actual}`,
                    actual,
                    expected: 'false',
                    result: false,
                })
            }
        },
        toContain: (expected) => {
            if (actual.includes(expected)) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} contain ${expected}`,
                    actual,
                    expected,
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected ${actual} contain ${expected}`,
                    actual,
                    expected,
                    result: false,
                })
            }
        },
        toBeGreaterThan: (expected) => {
            if (actual > expected) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} > ${expected}`,
                    actual,
                    expected,
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected the ${actual} greater than ${expected}`,
                    actual,
                    expected,
                    result: false,
                })
            }
        },
        toBeLessThan: (expected) => {
            if (actual < expected) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} > ${expected}`,
                    actual,
                    expected,
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Expected the ${actual} less than ${expected}`,
                    actual,
                    expected,
                    result: false,
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
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `The code is expected to throw an Exception`,
                    actual,
                    expected: 'throw',
                    result: false,
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
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `The error message is expected to be "${expected}" but received "${message}"`,
                    actual,
                    expected,
                    result: false,
                })
            }
        },
        toBeObjectEqual: (expected) => {
            const actualKeys = Object.keys(actual)
            const expectedKeys = Object.keys(expected)

            if (actualKeys.length !== expectedKeys.length) {
                failedTests++
                itScope.expects.push({
                    name: `Received object is not equal to expected object`,
                    actual,
                    expected,
                    result: false,
                })
                return
            }

            for (const key of actualKeys) {
                if (actual[key] !== expected[key]) {
                    failedTests++
                    itScope.expects.push({
                        name: `Received object is not equal to expected object`,
                        actual,
                        expected,
                        result: false,
                    })
                    return
                }
            }

            passedTests++
            itScope.expects.push({
                name: `Expect ${actual} to be deep equal ${expected}`,
                actual,
                expected,
                result: true,
            })
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
        toBeDeepEqual: (expected) => {
            let result = deepEqual(actual, expected)

            if (result) {
                passedTests++
                itScope.expects.push({
                    name: `Expect ${actual} deep equal to ${expected}`,
                    actual,
                    expected,
                    result: true,
                })
            } else {
                failedTests++
                itScope.expects.push({
                    name: `Objects are not deep equal`,
                    actual,
                    expected,
                    result: false,
                })
            }
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
