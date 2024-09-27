import {compareStructure, deepEqual} from "./helpers/objects.js";
import {stringify} from "./helpers/json.js";

export let expect = (actual) => {
    return {
        toBe: (expected, msg) => {
            let result = actual === expected

            return {
                name: result ? 'Test passed' : msg ?? `Expected value not equal to received`,
                actual,
                expected,
                result,
            }
        },
        toBeNot: (expected, msg) => {
            let result = actual !== expected

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is equal to received`,
                actual,
                expected,
                result,
            }
        },
        toBeEqualObject: (expected, msg) => {
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

            return {
                name: result ? 'Test passed' : msg ?? `Two objects are not equal`,
                actual,
                expected,
                result,
            }
        },
        toBeEqual: (expected, msg) => {
            let result = actual == expected

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not equal to received`,
                actual,
                expected,
                result,
            }
        },
        toBeNotEqual: (expected, msg) => {
            let result = actual != expected

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is equal to received`,
                actual,
                expected,
                result,
            }
        },
        toBeMatch: (expected, msg) => {
            let result = actual.match(expected)

            return {
                name: result ? 'Test passed' : msg ?? `Expected ${expected} received ${actual}`,
                actual,
                expected,
                result,
            }
        },
        toBeDefined: (msg) => {
            let result = actual !== undefined

            return {
                name: result ? 'Test passed' : msg ?? `Expected defined var received ${actual}`,
                actual,
                expected: 'defined',
                result,
            }
        },
        toBeUndefined: (msg) => {
            let result = actual === undefined

            return {
                name: result ? 'Test passed' : msg ?? `Expected undefined received ${actual}`,
                actual,
                expected: 'undefined',
                result,
            }
        },
        toBeNull: (msg) => {
            let result = actual === null

            return {
                name: result ? 'Test passed' : msg ?? `Expected null value but received ${actual}`,
                actual,
                expected: 'null',
                result,
            }
        },
        toBeNotNull: (msg) => {
            let result = actual !== null

            return {
                name: result ? 'Test passed' : msg ?? `Expected not null value`,
                actual,
                expected: 'null',
                result,
            }
        },
        toBeTrue: (msg) => {
            let result = actual === true

            return {
                name: result ? 'Test passed' : msg ?? `Expected true received ${actual}`,
                actual,
                expected: 'true',
                result,
            }
        },
        toBeFalse: (msg) => {
            let result = actual === false

            return {
                name: result ? 'Test passed' : msg ?? `Expected false received ${actual}`,
                actual,
                expected: 'false',
                result,
            }
        },
        toContain: (expected, msg) => {
            let result = actual.includes(expected)

            return {
                name: result ? 'Test passed' : msg ?? `Expected ${actual} contain ${expected}`,
                actual,
                expected,
                result,
            }
        },
        toBeGreaterThan: (expected, msg) => {
            let result = actual > expected

            return {
                name: result ? 'Test passed' : msg ?? `Value must be greater than expected`,
                actual,
                expected,
                result,
            }
        },
        toBeGreaterThanOrEqual: (expected, msg) => {
            let result = actual >= expected

            return {
                name: result ? 'Test passed' : msg ?? `Value must be greater than or equal to expected`,
                actual,
                expected,
                result,
            }
        },
        toBeLessThan: (expected, msg) => {
            let result = actual < expected

            return {
                name: result ? 'Test passed' : msg ?? `Value must be less than expected`,
                actual,
                expected,
                result,
            }
        },
        toBeLessThanOrEqual: (expected, msg) => {
            let result = actual <= expected

            return {
                name: result ? 'Test passed' : msg ?? `Value must be less than or equal to expected`,
                actual,
                expected,
                result,
            }
        },
        toThrow: (msg) => {
            let result = false
            try {
                actual()
            } catch (e) {
                result = true
            }

            return {
                name: result ? 'Test passed' : msg ?? `The code is expected to throw an Exception`,
                actual,
                expected: 'throw',
                result,
            }
        },
        toThrowError: (expected, msg) => {
            let result = false
            let message = ``
            try {
                actual()
            } catch (e) {
                message = e.message
                result = e.message.match(expected)
            }

            return {
                name: result ? 'Test passed' : msg ?? `The error message is expected to be "${expected}" but received "${message}"`,
                actual,
                expected,
                result,
            }
        },
        toBeArrayEqual: (expected, msg) => {
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

            return {
                name: result ? 'Test passed' : msg ?? `Arrays are not equal`,
                actual,
                expected,
                result,
            }
        },
        toBeDeepEqual: (expected, msg) => {
            let result = deepEqual(actual, expected)

            return {
                name: result ? 'Test passed' : msg ?? `Expected object not equal to received`,
                actual,
                expected,
                result,
            }
        },
        toBeDeepEqualSafe: (expected, msg) => {
            let map1 = stringify(actual)
            let map2 = stringify(expected)

            const result = map1 === map2

            return {
                name: result ? 'Test passed' : msg ?? `Expected object not equal to received`,
                actual,
                expected,
                result,
            }
        },
        toBeIP: (msg) => {
            let result4 = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)(?:[\/:]([1-9]\d{1,3}|[1-6]\d{4}))?$/.test(actual)
            let result6 = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm.test(actual)

            let result = result4 || result6

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not IPv4 or IPv6`,
                actual,
                expected: "IP Address",
                result,
            }
        },
        toBeIPv4: (msg) => {
            let result = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)(?:[\/:]([1-9]\d{1,3}|[1-6]\d{4}))?$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not IPv4`,
                actual,
                expected: "IPv4",
                result,
            }
        },
        toBeIPv6: (msg) => {
            let result = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not IPv6`,
                actual,
                expected: "IPv6",
                result,
            }
        },
        toBeEmail: (msg) => {
            let result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not valid email address`,
                actual,
                expected: "Email",
                result,
            }
        },
        toBeUrl: (msg) => {
            let result = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not valid url`,
                actual,
                expected: "Url",
                result,
            }
        },
        toBeBetween: (min, max, msg) => {
            let result = actual >= min && actual <= max

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not between ${min} and ${max}`,
                actual,
                expected: `Between ${min} and ${max}`,
                result,
            }
        },
        toBeType: (type, msg) => {
            let result = typeof actual === type

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not ${type}`,
                actual,
                expected: type,
                result,
            }
        },
        toBeInstanceOf: (type, msg) => {
            let result = actual instanceof type

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not instance of ${type}`,
                actual,
                expected: type,
                result,
            }
        },
        toBeEmpty: (msg) => {
            let result = actual.length === 0

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not empty`,
                actual,
                expected: 'Empty',
                result,
            }
        },
        toBeNotEmpty: (msg) => {
            let result = actual.length > 0

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is empty`,
                actual,
                expected: 'Empty',
                result,
            }
        },
        toBeSorted: (msg) => {
            let result = actual.every((v, i, a) => !i || a[i - 1] <= v)
            let expected = actual.slice().sort((a, b) => a - b)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not sorted`,
                actual,
                expected,
                result,
            }
        },
        toBeUnique: (msg) => {
            let result = new Set(actual).size === actual.length

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not unique`,
                actual,
                expected: 'Unique',
                result,
            }
        },
        toStructureEqual: (expected, msg) => {
            let result = compareStructure(actual, expected)

            return {
                name: result ? 'Test passed' : msg ?? `Expected object not equal to received`,
                actual,
                expected,
                result,
            }
        },
    }
}
