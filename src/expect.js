import {compareStructure, deepEqual} from "./helpers/objects.js";
import {stringify} from "./helpers/json.js";
import {testValue} from "./helpers/test-value.js";

/**
 * Function to create an expectation object for the given actual value,
 * providing methods to assert various conditions.
 *
 * @param actual - The actual value to assert against.
 * @returns An object containing multiple assertion methods.
 */
export let expect = (actual) => {
    return {
        /**
         * Asserts that the actual value is equal to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBe: (expected, msg = null) => {
            let result = Object.is(actual, expected)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value not equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is not equal to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNot: (expected, msg = null) => {
            let result = Object.is(actual, expected) === false

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is strict equal (using ===) to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeStrictEqual: (expected, msg = null) => {
            let result = actual === expected

            return {
                message: result ? 'Test passed' : msg ?? `Expected value not strict equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value isn't strict equal (using !==) to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNotStrictEqual: (expected, msg = null) => {
            let result = actual !== expected

            return {
                message: result ? 'Test passed' : msg ?? `Expected value strict equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is equal (using ==) to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeEqual: (expected, msg = null) => {
            let result = actual == expected

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is not equal (using !=) to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNotEqual: (expected, msg = null) => {
            let result = actual != expected

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual object is equal to the expected object.
         * @param expected - The expected object.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeObject: (expected, msg = null) => {
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
                message: result ? 'Test passed' : msg ?? `Two objects are not equal`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value matches the expected pattern.
         * @param expected - The expected pattern.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeMatch: (expected, msg = null) => {
            let result = actual.match(expected)

            return {
                message: result ? 'Test passed' : msg ?? `Expected ${expected} received ${actual}`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is defined.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeDefined: (msg = null) => {
            let result = typeof actual !== "undefined"

            return {
                message: result ? 'Test passed' : msg ?? `Expected defined var received ${actual}`,
                actual,
                expected: 'defined',
                result,
            }
        },

        /**
         * Asserts that the actual value is undefined.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeUndefined: (msg = null) => {
            let result = typeof actual === "undefined"

            return {
                message: result ? 'Test passed' : msg ?? `Expected undefined received ${actual}`,
                actual,
                expected: 'undefined',
                result,
            }
        },

        /**
         * Asserts that the actual value is null.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNull: (msg = null) => {
            let result = actual === null

            return {
                message: result ? 'Test passed' : msg ?? `Expected null value but received ${actual}`,
                actual,
                expected: 'null',
                result,
            }
        },

        /**
         * Asserts that the actual value is not null.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNotNull: (msg = null) => {
            let result = actual !== null

            return {
                message: result ? 'Test passed' : msg ?? `Expected not null value`,
                actual,
                expected: 'null',
                result,
            }
        },

        /**
         * Asserts that the actual value is true.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeTrue: (msg = null) => {
            let result = actual === true

            return {
                message: result ? 'Test passed' : msg ?? `Expected true received ${actual}`,
                actual,
                expected: 'true',
                result,
            }
        },

        /**
         * Asserts that the actual value is false.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeFalse: (msg = null) => {
            let result = actual === false

            return {
                message: result ? 'Test passed' : msg ?? `Expected false received ${actual}`,
                actual,
                expected: 'false',
                result,
            }
        },

        /**
         * Asserts that the actual value contains the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toContain: (expected, msg = null) => {
            let result

            if (typeof actual === 'object') {
                result = actual.hasOwnProperty(expected)
            } else if (Array.isArray(actual)) {
                if (Array.isArray(expected)) {
                    result = expected.every((v) => actual.includes(v))
                } else {
                    result = actual.includes(expected)
                }
            } else {
                result = actual.includes(expected)
            }

            return {
                message: result ? 'Test passed' : msg ?? `Expected ${actual} contain ${expected}`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is greater than the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeGreaterThan: (expected, msg = null) => {
            let result = actual > expected

            return {
                message: result ? 'Test passed' : msg ?? `Value must be greater than expected`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is greater than or equal to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeGreaterThanOrEqual: (expected, msg = null) => {
            let result = actual >= expected

            return {
                message: result ? 'Test passed' : msg ?? `Value must be greater than or equal to expected`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is less than the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeLessThan: (expected, msg = null) => {
            let result = actual < expected

            return {
                message: result ? 'Test passed' : msg ?? `Value must be less than expected`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is less than or equal to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeLessThanOrEqual: (expected, msg = null) => {
            let result = actual <= expected

            return {
                message: result ? 'Test passed' : msg ?? `Value must be less than or equal to expected`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual function throws an error.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toThrow: (msg = null) => {
            let result = false
            try {
                actual()
            } catch (e) {
                result = true
            }

            return {
                message: result ? 'Test passed' : msg ?? `The code is expected to throw an Exception`,
                actual,
                expected: 'throw',
                result,
            }
        },

        /**
         * Asserts that the actual function throws an error matching the expected value.
         * @param expected - The expected error.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toThrowError: (expected, msg = null) => {
            let result = false
            let message = ``
            try {
                actual()
            } catch (e) {
                message = e.message
                result = e.message.match(expected) !== null
            }

            return {
                message: result ? 'Test passed' : msg ?? `The error message is expected to be "${expected}" but received "${message}"`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual array is equal to the expected array.
         * @param expected - The expected array.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeArrayEqual: (expected, msg = null) => {
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
                message: result ? 'Test passed' : msg ?? `Arrays are not equal`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is deeply equal to the expected value.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeDeepEqual: (expected, msg = null) => {
            let result = deepEqual(actual, expected)

            return {
                message: result ? 'Test passed' : msg ?? `Expected object not equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is deeply equal to the expected value using a safe comparison.
         * @param expected - The expected value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeDeepEqualSafe: (expected, msg = null) => {
            let map1 = stringify(actual)
            let map2 = stringify(expected)

            const result = map1 === map2

            return {
                message: result ? 'Test passed' : msg ?? `Expected object not equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is a valid IP address.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeIP: (msg = null) => {
            let result4 = testValue(actual, 'ipv4')
            let result6 = testValue(actual, 'ipv6')

            let result = result4 || result6

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not IPv4 or IPv6`,
                actual,
                expected: "IP Address",
                result,
            }
        },

        /**
         * Asserts that the actual value is a valid IPv4 address.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeIPv4: (msg = null) => {
            let result = testValue(actual, 'ipv4')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not IPv4`,
                actual,
                expected: "IPv4",
                result,
            }
        },

        /**
         * Asserts that the actual value is a valid IPv6 address.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeIPv6: (msg = null) => {
            let result = testValue(actual, 'ipv6')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not IPv6`,
                actual,
                expected: "IPv6",
                result,
            }
        },

        /**
         * Asserts that the actual value is a valid email address.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeEmail: (msg = null) => {
            let result = testValue(actual, 'email')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not valid email address`,
                actual,
                expected: "Email",
                result,
            }
        },

        /**
         * Asserts that the actual value is a valid URL.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeUrl: (msg = null) => {
            let result = testValue(actual, 'url')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not valid url`,
                actual,
                expected: "Url",
                result,
            }
        },

        /**
         * Asserts that the actual value is between the specified minimum and maximum values.
         * @param min - The minimum value.
         * @param max - The maximum value.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeBetween: (min, max, msg = null) => {
            let result = actual >= min && actual <= max

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not between ${min} and ${max}`,
                actual,
                expected: `Between ${min} and ${max}`,
                result,
            }
        },

        /**
         * Asserts that the actual value is of the specified type.
         * @param type - The expected type.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeType: (type, msg = null) => {
            let result = typeof actual === type

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not ${type}`,
                actual,
                expected: type,
                result,
            }
        },

        /**
         * Asserts that the actual value is an instance of the specified type.
         * @param type - The expected type.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeInstanceOf: (type, msg = null) => {
            let result = actual instanceof type

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not instance of ${type}`,
                actual,
                expected: type,
                result,
            }
        },

        /**
         * Asserts that the actual value is empty.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeEmpty: (msg = null) => {
            let result = actual.length === 0

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not empty`,
                actual,
                expected: 'Empty',
                result,
            }
        },

        /**
         * Asserts that the actual value is not empty.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNotEmpty: (msg = null) => {
            let result = actual.length > 0

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is empty`,
                actual,
                expected: 'Empty',
                result,
            }
        },

        /**
         * Asserts that the actual value is sorted.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeSorted: (msg = null) => {
            let result = actual.every((v, i, a) => !i || a[i - 1] <= v)
            let expected = actual.slice().sort((a, b) => a - b)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not sorted`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is unique.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeUnique: (msg = null) => {
            let result = new Set(actual).size === actual.length

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not unique`,
                actual,
                expected: 'Unique',
                result,
            }
        },

        /**
         * Asserts that the actual structure is equal to the expected structure.
         * @param expected - The expected structure.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toStructureEqual: (expected, msg = null) => {
            let result = compareStructure(actual, expected)

            return {
                message: result ? 'Test passed' : msg ?? `Expected object not equal to received`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value is an integer.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeInteger: (msg = null) => {
            let result = Number.isInteger(actual)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not integer`,
                actual,
                expected: 'Integer',
                result,
            }
        },

        /**
         * Asserts that the actual value is a safe integer.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeSafeInteger: (msg = null) => {
            let result = Number.isSafeInteger(actual)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not safe integer`,
                actual,
                expected: 'Safe Integer',
                result,
            }
        },

        /**
         * Asserts that the actual value is a float.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeFloat: (msg = null) => {
            let result = Number(actual) === actual && actual % 1 !== 0

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not float`,
                actual,
                expected: 'Float',
                result,
            }
        },

        /**
         * Asserts that the actual value is positive.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBePositive: (msg = null) => {
            let result = actual > 0

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not positive`,
                actual,
                expected: 'Positive',
                result,
            }
        },

        /**
         * Asserts that the actual value is negative.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNegative: (msg = null) => {
            let result = actual < 0

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not negative`,
                actual,
                expected: 'Negative',
                result,
            }
        },

        /**
         * Asserts that the actual value is finite.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeFinite: (msg = null) => {
            let result = Number.isFinite(actual)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not finite`,
                actual,
                expected: 'Finite',
                result,
            }
        },

        /**
         * Asserts that the actual value is a number and not is NaN.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNumber: (msg = null) => {
            let result = typeof actual === 'number' || !isNaN(actual)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not number`,
                actual,
                expected: 'Number',
                result,
            }
        },

        /**
         * Asserts that the actual value is NaN.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeNaN: (msg = null) => {
            let result = isNaN(actual)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not NaN`,
                actual,
                expected: 'NaN',
                result,
            }
        },

        /**
         * Asserts that the actual value is a string.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeString: (msg = null) => {
            let result = typeof actual === 'string'

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not string`,
                actual,
                expected: 'String',
                result,
            }
        },

        /**
         * Asserts that the actual value is a boolean.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeBoolean: (msg = null) => {
            let result = typeof actual === 'boolean'

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not boolean`,
                actual,
                expected: 'Boolean',
                result,
            }
        },

        /**
         * Asserts that the actual value is a function.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeFunction: (msg = null) => {
            let result = typeof actual === 'function'

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not function`,
                actual,
                expected: 'Function',
                result,
            }
        },

        /**
         * Asserts that the actual value is an async function.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeAsyncFunction: (msg = null) => {
            let result = actual.constructor.name === 'AsyncFunction'

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not async function`,
                actual,
                expected: 'Async Function',
                result,
            }
        },

        /**
         * Asserts that the actual value is an array.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeArray: (msg = null) => {
            let result = Array.isArray(actual)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not array`,
                actual,
                expected: 'Array',
                result,
            }
        },

        /**
         * Asserts that the actual value is a date.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeDate: (msg = null) => {
            let result = actual instanceof Date

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not date`,
                actual,
                expected: 'Date',
                result,
            }
        },

        /**
         * Asserts that the actual value is a regular expression.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeRegExp: (msg = null) => {
            let result = actual instanceof RegExp

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not regular expression`,
                actual,
                expected: 'RegExp',
                result,
            }
        },

        /**
         * Asserts that the actual value is a symbol.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeSymbol: (msg = null) => {
            let result = typeof actual === 'symbol'

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not symbol`,
                actual,
                expected: 'Symbol',
                result,
            }
        },

        /**
         * Asserts that the actual value is a BigInt.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeBigInt: (msg = null) => {
            let result = typeof actual === 'bigint'

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not big int`,
                actual,
                expected: 'BigInt',
                result,
            }
        },

        /**
         * Asserts that the actual value is a Map.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeMap: (msg = null) => {
            let result = actual instanceof Map

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not map`,
                actual,
                expected: 'Map',
                result,
            }
        },

        /**
         * Asserts that the actual value is a Set.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeSet: (msg = null) => {
            let result = actual instanceof Set

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not set`,
                actual,
                expected: 'Set',
                result,
            }
        },

        /**
         * Asserts that the actual value is a WeakMap.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeWeakMap: (msg = null) => {
            let result = actual instanceof Map

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not map`,
                actual,
                expected: 'Map',
                result,
            }
        },

        /**
         * Asserts that the actual value is a WeakSet.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeWeakSet: (msg = null) => {
            let result = actual instanceof Set

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not set`,
                actual,
                expected: 'Set',
                result,
            }
        },

        /**
         * Asserts that the actual value is an ArrayBuffer.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeArrayBuffer: (msg = null) => {
            let result = actual instanceof ArrayBuffer

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not array buffer`,
                actual,
                expected: 'ArrayBuffer',
                result,
            }
        },

        /**
         * Asserts that the actual value is a Promise.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBePromise: (msg = null) => {
            let result = actual instanceof Promise

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not promise`,
                actual,
                expected: 'Promise',
                result,
            }
        },

        /**
         * Asserts that the actual value is a Base64 encoded string.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeBase64: (msg = null) => {
            let result = testValue(actual, 'base64')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not base64`,
                actual,
                expected: 'Base64',
                result,
            }
        },

        /**
         * Asserts that the actual value is a JSON string.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeJson: (msg = null) => {
            let result = /^[\],:{}\s]*$/.test(actual.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not json`,
                actual,
                expected: 'Json',
                result,
            }
        },

        /**
         * Asserts that the actual value is an XML string.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeXml: (msg = null) => {
            let result = testValue(actual, 'xml')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not xml`,
                actual,
                expected: 'Xml',
                result,
            }
        },

        /**
         * Asserts that the actual value is a HEX color.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeHEXColor: (msg = null) => {
            let result = testValue(actual, 'hex')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not hex color`,
                actual,
                expected: 'Valid Hex Color: #xxx or #xxxxxx',
                result,
            }
        },

        /**
         * Asserts that the actual value is an RGB color.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeRGBColor: (msg = null) => {
            let result = testValue(actual, 'rgb')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not rgb color`,
                actual,
                expected: 'RGB Color',
                result,
            }
        },

        /**
         * Asserts that the actual value is an RGBA color.
         * @param msg - The message to display if the assertion fails.
         * @returns The result of the test.
         */
        toBeRGBAColor: (msg = null) => {
            let result = testValue(actual, 'rgba')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not rgba color`,
                actual,
                expected: 'RGBA Color',
                result,
            }
        },

        /**
         * Asserts that the actual value is an HSL color.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeHSLColor: (msg = null) => {
            let result = testValue(actual, 'hsl')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not hsl color`,
                actual,
                expected: 'HSL Color',
                result,
            }
        },

        /**
         * Asserts that the actual value is an HSLA color.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeHSLAColor: (msg = null) => {
            let result = testValue(actual, 'hsla')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not hsla color`,
                actual,
                expected: 'HSLA Color',
                result,
            }
        },

        /**
         * Asserts that the actual value is a CMYK color.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeCMYKColor: (msg = null) => {
            let result = testValue(actual, 'cmyk')

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not cmyk color`,
                actual,
                expected: 'CMYK Color',
                result,
            }
        },

        /**
         * Asserts that the actual value is a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeColor: (msg = null) => {
            const testHex = testValue(actual, 'hex')
            const testRGB = testValue(actual, 'rgb')
            const testRGBA = testValue(actual, 'rgba')
            const testHSL = testValue(actual, 'hsl')
            const testHSLA = testValue(actual, 'hsla')
            const testCMYK = testValue(actual, 'cmyk')

            const result = testHex || testRGB || testRGBA || testHSL || testHSLA || testCMYK

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not color`,
                actual,
                expected: 'Color',
                result,
            }
        },

        /**
         * Asserts that the actual value is not a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeNotColor: (msg = null) => {
            const testHex = testValue(actual, 'hex')
            const testRGB = testValue(actual, 'rgb')
            const testRGBA = testValue(actual, 'rgba')
            const testHSL = testValue(actual, 'hsl')
            const testHSLA = testValue(actual, 'hsla')
            const testCMYK = testValue(actual, 'cmyk')

            const result = !(testHex || testRGB || testRGBA || testHSL || testHSLA || testCMYK)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is color`,
                actual,
                expected: 'Color',
                result,
            }
        },

        /**
         * Asserts that the actual value is an HTML element.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeHtmlElement: (msg = null) => {
            let result = actual instanceof HTMLElement

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not html element`,
                actual,
                expected: 'HTMLElement',
                result,
            }
        },

        /**
         * Asserts that the actual value is an HTML node.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeHtmlNode: (msg = null) => {
            let result = actual instanceof Node

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not html node`,
                actual,
                expected: 'Node',
                result,
            }
        },

        /**
         * Asserts that the actual value is an HTML document.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeHtmlDocument: (msg = null) => {
            let result = actual instanceof Document

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not html document`,
                actual,
                expected: 'Document',
                result,
            }
        },

        /**
         * Asserts that the actual value is an HTML collection.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeHtmlCollection: (msg = null) => {
            let result = actual instanceof HTMLCollection

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not html collection`,
                actual,
                expected: 'HTMLCollection',
                result,
            }
        },

        /**
         * Asserts that the actual value is a Window object.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeHtmlWindow: (msg = null) => {
            let result = actual instanceof Window

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not html window`,
                actual,
                expected: 'Window',
                result,
            }
        },

        /**
         * Asserts that the actual value is a Text node.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeHtmlTextNode: (msg = null) => {
            let result = actual instanceof Text

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not html text node`,
                actual,
                expected: 'Text',
                result,
            }
        },

        /**
         * Asserts that the HTML element has the specified class.
         * @param {string} expected - The expected class name.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        hasClass: (expected, msg = null) => {
            let result = actual.classList && actual.classList.contains(expected)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value has not class ${expected}`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the HTML element has the specified attribute.
         * @param {string} expected - The expected attribute name.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        hasAttribute: (expected, msg = null) => {
            let result = actual.hasAttribute(expected)

            return {
                message: result ? 'Test passed' : msg ?? `Expected value has not attribute ${expected}`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the actual value has the specified property.
         * @param {string} expected - The expected property name.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        hasProperty: (expected, msg = null) => {
            let result = actual[expected] !== undefined

            return {
                message: result ? 'Test passed' : msg ?? `Expected value has not property ${expected}`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the HTML element has children.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        hasChildren: (msg = null) => {
            let result = actual instanceof HTMLElement && actual.children.length > 0

            return {
                message: result ? 'Test passed' : msg ?? `Expected value has no children`,
                actual,
                expected: 'Children',
                result,
            }
        },

        /**
         * Asserts that the HTML element has a parent.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        hasParent: (msg = null) => {
            let result = actual instanceof HTMLElement && actual.parentElement !== null

            return {
                message: result ? 'Test passed' : msg ?? `Expected value has no parent`,
                actual,
                expected: 'Parent',
                result,
            }
        },

        /**
         * Asserts that the HTML element has no parent.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        hasNoParent: (msg = null) => {
            let result = actual instanceof HTMLElement && actual.parentElement === null

            return {
                message: result ? 'Test passed' : msg ?? `Expected value has a parent`,
                actual,
                expected: 'Parent',
                result,
            }
        },

        /**
         * Asserts the mock function was called at least once
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeenCalled: (msg = null) => {
            let result = actual.mock.calls.length > 0

            return {
                message: result ? 'Test passed' : msg ?? `Expected function is not called`,
                actual,
                expected: 'Called',
                result,
            }
        },

        /**
         * Asserts the mock function was called at least once
         * @param expected
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeenCalledTimes: (expected, msg = null) => {
            let result = actual.mock.calls.length === expected

            return {
                message: result ? 'Test passed' : msg ?? `Function was called ${actual.mock.calls.length} times instead of ${expected}`,
                actual,
                expected: 'Called',
                result,
            }
        },

         /**
         * Asserts that the mock function was called with specified arguments.
         * @param {Array} expected - The expected arguments.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeenCalledWith: (expected, msg = null) => {
            let result = actual.mock.calls.some(call => deepEqual(call, expected))

            return {
                message: result ? 'Test passed' : msg ?? `Expected function is not called with ${expected}`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the mock function was called last with specified arguments.
         * @param {Array} expected - The expected arguments.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeenLastCalledWith: (expected, msg = null) => {
            let result = deepEqual(actual.mock.calls[actual.mock.calls.length - 1], expected)

            return {
                message: result ? 'Test passed' : msg ?? `Expected function is not called with ${expected}`,
                actual,
                expected,
                result,
            }
        },

        /**
         * Asserts that the array-like object has the expected length.
         * @param {number} expected - The expected length.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        hasLength: (expected, msg = null) => {
            let result = actual.length === expected

            return {
                message: result ? 'Test passed' : msg ?? `Expected value has not length ${expected}`,
                actual,
                expected,
                result,
            }            
        },


        /**
         * Asserts that the actual value is close to the expected value within a certain precision.
         * @param {number} expected - The expected value to compare against.
         * @param {number} [precision=2] - The number of decimal places to consider in the comparison.
         * @param {string|null} [msg=null] - The message to display if the assertion fails.
         * @returns {Object} The result of the test.
         */
        toBeCloseTo: (expected, precision = 2, msg = null) => {
            let result = Math.abs(actual - expected) < Math.pow(10, -precision) / 2

            return {
                message: result ? 'Test passed' : msg ?? `Expected value is not close to ${expected}`,
                actual,
                expected,
                result,
            }
        },
    }
}
