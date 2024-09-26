import { glob } from 'glob'
import { pathToFileURL } from 'url';
import fs from 'fs'
import { showTestsResults } from './result.js'
import 'global-jsdom/register'
import { JSDOM } from 'jsdom'
import {deepEqual, compareStructure} from './helpers/objects.js'

const beforeEachFunctions = []
const afterEachFunctions = []
const beforeAllFunctions = []
const afterAllFunctions = []
const statsSuites = []
const statsSimpleTests = []

let simpleTests = {
    name: 'Simple tests',
    it: []
}
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
        queue.set(file, [])
        await import(pathToFileURL(fs.realpathSync(file)).href)
    }

    // console.log(queue)

    await queueRunner(queue)

    showTestsResults({
        suites: statsSuites,
        simple: statsSimpleTests,
        config,
    })
}

export const DOM = (html = ``, options = {}) => {
    return new JSDOM(html, options)
}

export function describe (name, fn) {
    currentDescribe = {
        name: name,
        it: [],
        beforeAll: [],
        afterAll: [],
        startTime: process.hrtime(),
        duration: 0,
    }

    for(let fn1 of beforeAllFunctions) {
        currentDescribe.beforeAll.push(fn1.bind(this))
        // fn1.apply(this)
    }

    fn.apply(this)

    for(let fn1 of afterAllFunctions) {
        currentDescribe.afterAll.push(fn1.bind(this))
        // fn1.apply(this)
    }

    queue.set(currentTestFile, [...queue.get(currentTestFile), currentDescribe])

    // const [seconds, nanoseconds] = process.hrtime(currentDescribe.startTime);
    // currentDescribe.duration = (seconds * 1e9 + nanoseconds) / 1e6;
    // statsSuites.push(currentDescribe)
}

export function it (name, fn) {
    itScope = {
        name: name,
        expects: [],
        startTime: process.hrtime(),
    }

    for (let fn1 of beforeEachFunctions) {
        currentDescribe.it.push(fn1.bind(this))
        // fn1.apply(this)
    }

    currentDescribe.it.push(fn.bind(this))
    // fn.apply(this);

    for (let fn1 of afterEachFunctions) {
        currentDescribe.it.push(fn1.bind(this))
        // fn1.apply(this)
    }

    // const [seconds, nanoseconds] = process.hrtime(itScope.startTime);
    // itScope.duration = (seconds * 1e9 + nanoseconds) / 1e6;

    // currentDescribe.it.push(itScope)
}

export function test (name, fn) {
    return
    itScope = {
        name: `Test ${name}`,
        expects: [],
        startTime: process.hrtime(),
    }

    fn.apply(this);

    const [seconds, nanoseconds] = process.hrtime(itScope.startTime);
    itScope.duration = (seconds * 1e9 + nanoseconds) / 1e6;

    simpleTests.it.push(itScope)
    statsSimpleTests.push(simpleTests)
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

const queueRunner = async () => {
    for (let [file, tests] of queue) {
        console.log(file)
        for (let test of tests) {
            currentDescribe = test
            for (let it of test.it) {
                console.log(test.name)
                await it()
            }
        }
    }
}

export function expect (actual) {
    return {
        toBe: (expected) => {
            let result = actual === expected

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value not equal to received`,
                actual,
                expected,
                result,
            })
        },
        toBeNot: (expected) => {
            let result = actual !== expected

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is equal to received`,
                actual,
                expected,
                result,
            })
        },
        toBeEqualObject: (expected) => {
            let result = true
            let key1 = Object.keys(actual)
            let key2 = Object.keys(expected)

            if (key1.length !== key2.length) {
                result = false
            } else {
                for (let key of key1) {
                    if (actual[key] !== expected[key]) {
                        result = false
                    }
                }
            }

            itScope.expects.push({
                name: result ? 'Test passed' : `Two objects are not equal`,
                actual,
                expected,
                result,
            })
        },
        toBeEqual: (expected) => {
            let result = actual == expected

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not equal to received`,
                actual,
                expected,
                result,
            })
        },
        toBeNotEqual: (expected) => {
            let result = actual != expected

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is equal to received`,
                actual,
                expected,
                result,
            })
        },
        toBeMatch: (expected) => {
            let result = actual.match(expected)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected ${expected} received ${actual}`,
                actual,
                expected,
                result,
            })
        },
        toBeDefined: () => {
            let result = actual !== undefined

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected defined var received ${actual}`,
                actual,
                expected: 'defined',
                result,
            })
        },
        toBeUndefined: () => {
            let result = actual === undefined

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected undefined received ${actual}`,
                actual,
                expected: 'undefined',
                result,
            })
        },
        toBeNull: () => {
            let result = actual === null

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected null value but received ${actual}`,
                actual,
                expected: 'null',
                result,
            })
        },
        toBeNotNull: () => {
            let result = actual !== null

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected not null value`,
                actual,
                expected: 'null',
                result,
            })
        },
        toBeTruthy: () => {
            let result = actual === true

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected true received ${actual}`,
                actual,
                expected: 'true',
                result,
            })
        },
        toBeFalsy: () => {
            let result = actual === false

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected false received ${actual}`,
                actual,
                expected: 'false',
                result,
            })
        },
        toContain: (expected) => {
            let result = actual.includes(expected)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected ${actual} contain ${expected}`,
                actual,
                expected,
                result,
            })
        },
        toBeGreaterThan: (expected) => {
            let result = actual > expected

            itScope.expects.push({
                name: result ? 'Test passed' : `Value must be greater than expected`,
                actual,
                expected,
                result,
            })
        },
        toBeGreaterThanOrEqual: (expected) => {
            let result = actual >= expected

            itScope.expects.push({
                name: result ? 'Test passed' : `Value must be greater than or equal to expected`,
                actual,
                expected,
                result,
            })
        },
        toBeLessThan: (expected) => {
            let result = actual < expected

            itScope.expects.push({
                name: result ? 'Test passed' : `Value must be less than expected`,
                actual,
                expected,
                result,
            })
        },
        toBeLessThanOrEqual: (expected) => {
            let result = actual <= expected

            itScope.expects.push({
                name: result ? 'Test passed' : `Value must be less than or equal to expected`,
                actual,
                expected,
                result,
            })
        },
        toThrow: () => {
            let result = false
            try {
                actual()
            } catch (e) {
                result = true
            }

            itScope.expects.push({
                name: result ? 'Test passed' : `The code is expected to throw an Exception`,
                actual,
                expected: 'throw',
                result,
            })
        },
        toThrowError: (expected) => {
            let result = false
            let message = ``
            try {
                actual()
            } catch (e) {
                message = e.message
                result = e.message.match(expected)
            }

            itScope.expects.push({
                name: result ? 'Test passed' : `The error message is expected to be "${expected}" but received "${message}"`,
                actual,
                expected,
                result,
            })
        },
        toBeArrayEqual: (expected) => {
            let result = true

            if (actual.length !== expected.length) {
                result = false
            } else {
                for (let i = 0; i < actual.length; i++) {
                    if (actual[i] !== expected[i]) {
                        result = false
                    }
                }
            }

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected [${expected.join(',')}] received [${actual.join(',')}]`,
                actual,
                expected,
                result,
            })
        },
        toBeDeepEqual: (expected) => {
            let result = deepEqual(actual, expected)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected object not equal to received`,
                actual,
                expected,
                result,
            })
        },
        toBeIP: () => {
            let result4 = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)(?:[\/:]([1-9]\d{1,3}|[1-6]\d{4}))?$/.test(actual)
            let result6 = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm.test(actual)

            let result = result4 || result6

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not IPv4 or IPv6`,
                actual,
                expected: "IP Address",
                result,
            })
        },
        toBeIPv4: () => {
            let result = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)(?:[\/:]([1-9]\d{1,3}|[1-6]\d{4}))?$/.test(actual)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not IPv4`,
                actual,
                expected: "IPv4",
                result,
            })
        },
        toBeIPv6: () => {
            let result = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm.test(actual)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not IPv6`,
                actual,
                expected: "IPv6",
                result,
            })
        },
        toBeEmail: () => {
            let result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(actual)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not valid email address`,
                actual,
                expected: "Email",
                result,
            })
        },
        toBeUrl: () => {
            let result = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i.test(actual)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not valid url`,
                actual,
                expected: "Url",
                result,
            })
        },
        toBeBetween: (min, max) => {
            let result = actual >= min && actual <= max

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not between ${min} and ${max}`,
                actual,
                expected: `Between ${min} and ${max}`,
                result,
            })
        },
        toBeType: (type) => {
            let result = typeof actual === type

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not ${type}`,
                actual,
                expected: type,
                result,
            })
        },
        toBeInstanceOf: (type) => {
            let result = actual instanceof type

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not instance of ${type}`,
                actual,
                expected: type,
                result,
            })
        },
        toBeEmpty: () => {
            let result = actual.length === 0

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not empty`,
                actual,
                expected: 'Empty',
                result,
            })
        },
        toBeNotEmpty: () => {
            let result = actual.length > 0

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is empty`,
                actual,
                expected: 'Empty',
                result,
            })
        },
        toBeSorted: () => {
            let result = actual.every((v, i, a) => !i || a[i - 1] <= v)
            let expected = actual.slice().sort((a, b) => a - b)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not sorted`,
                actual,
                expected,
                result,
            })
        },
        toBeUnique: () => {
            let result = new Set(actual).size === actual.length

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected value is not unique`,
                actual,
                expected: 'Unique',
                result,
            })
        },
        toStructureEqual: (expected) => {
            let result = equalStruct(actual, expected)

            itScope.expects.push({
                name: result ? 'Test passed' : `Expected object not equal to received`,
                actual,
                expected,
                result,
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
