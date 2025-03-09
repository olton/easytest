import {compareStructure, deepEqual} from "../helpers/objects.js";
import {stringify} from "../helpers/json.js";
import {testValue} from "../helpers/test-value.js";
import checkArraySorted from "../helpers/check-array-sorted.js";

export class ExpectError extends Error {
    constructor(message, matcher, received, expected) {
        super(message)
        this.name = matcher
        this.received = received
        this.expected = expected
    }
}

export class Expect {
    received = null

    constructor(received) {
        this.received = received
    }

    /**
     * Asserts that the actual value is equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBe(expected, msg = null) {
        let received = this.received
        let result = Object.is(received, expected)

        if (!result) {
            throw new ExpectError(msg || `Expected value not equal to received`, 'toBe', received, expected)
        }
    }

    /**
     * Asserts that the actual value is not equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNot(expected, msg = null) {
        let received = this.received
        let result = Object.is(received, expected) === false

        if (!result) {
            throw new ExpectError(msg ?? `Expected value is equal to received`, 'toBeNot', received, expected)
        }
    }

    /**
     * Asserts that the actual value is strict equal (using ===) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeStrictEqual(expected, msg = null) {
        let received = this.received
        let result = received === expected

        if (!result) {
            throw new ExpectError(msg || `Expected value not strict equal to received`, 'toBeStrictEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual value isn't strict equal (using !==) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotStrictEqual(expected, msg = null) {
        let received = this.received
        let result = received !== expected

        if (!result) {
            throw new ExpectError(msg || `Expected value strict equal to received`, 'toBeNotStrictEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual value is equal (using ==) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEqual(expected, msg = null) {
        let received = this.received
        let result = received == expected

        if (!result) {
            throw new ExpectError(msg || `Expected value not equal to received`, 'toBeEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual value is not equal (using !=) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotEqual(expected, msg = null) {
        let received = this.received
        let result = received != expected

        if (!result) {
            throw new ExpectError(msg || `Expected value equal to received`, 'toBeNotEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual object is equal to the expected object.
     * @param expected - The expected object.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeObject(expected, msg = null) {
        let received = this.received
        let result = true
        let key1 = Object.keys(received)
        let key2 = Object.keys(expected)

        if (key1.length !== key2.length) {
            result = false
        } else {
            for (let key of key1) {
                if (received[key] !== expected[key]) {
                    result = false
                }
            }
        }

        if (!result) {
            throw new ExpectError(msg || `Expected object not equal to received`, 'toBeObject', received, expected)
        }
    }

    /**
     * Asserts that the actual value is true.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeTrue(msg = null) {
        let received = this.received
        let result = received === true

        if (!result) {
            throw new ExpectError(msg || `Expected true received ${received}`, 'toBeTrue', received, true)
        }
    }

    /**
     * Asserts that the actual value is false.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFalse(msg = null) {
        let received = this.received
        let result = received === false

        if (!result) {
            throw new ExpectError(msg || `Expected false received ${received}`, 'toBeFalse', received, false)
        }
    }

    /**
     * Asserts that the actual value is a boolean.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBoolean(msg = null) {
        let received = this.received
        let result = typeof received === 'boolean'

        if (!result) {
            throw new ExpectError(msg || `Expected value is not boolean`, 'toBeBoolean', received, 'Boolean')
        }
    }

    /**
     * Asserts that the actual value matches the expected pattern.
     * @param expected - The expected pattern.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toMatch(expected, msg = null) {
        let received = this.received
        let result = received.match(expected)

        if (!result) {
            throw new ExpectError(msg || `Expected value not match received`, 'toBeMatch', received, expected)
        }
    }

    /**
     * Asserts that the actual value not matches the expected pattern.
     * @param expected - The expected pattern.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toNotMatch(expected, msg = null) {
        let received = this.received
        let result = !received.match(expected)

        if (!result) {
            throw new ExpectError(msg || `Expected value matched to received`, 'toNotMatch', received, expected)
        }
    }

    /**
     * Asserts that the actual value is defined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDefined(msg = null) {
        let received = this.received
        let result = typeof received !== "undefined"

        if (!result) {
            throw new ExpectError(msg || `Expected defined value received ${received}`, 'toBeDefined', received, 'defined')
        }
    }

    /**
     * Asserts that the actual value is undefined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUndefined(msg = null) {
        let received = this.received
        let result = typeof received === "undefined"

        if (!result) {
            throw new ExpectError(msg || `Expected undefined value received ${received}`, 'toBeUndefined', received, 'undefined')
        }
    }

    /**
     * Asserts that the actual value is null.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNull(msg = null) {
        let received = this.received
        let result = received === null

        if (!result) {
            throw new ExpectError(msg || `Expected null received ${received}`, 'toBeNull', received, 'null')
        }
    }

    /**
     * Asserts that the actual value is not null.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotNull(msg = null) {
        let received = this.received
        let result = received !== null

        if (!result) {
            throw new ExpectError(msg || `Expected not null received ${received}`, 'toBeNotNull', received, 'not null')
        }
    }

    /**
     * Asserts that the actual value is greater than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeGreaterThan(expected, msg = null) {
        let received = this.received
        let result = received > expected

        if (!result) {
            throw new ExpectError(msg || `Expected value not greater than received`, 'toBeGreaterThan', received, expected)
        }
    }

    /**
     * Asserts that the actual value is greater than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeGreaterThanOrEqual(expected, msg = null) {
        let received = this.received
        let result = received >= expected

        if (!result) {
            throw new ExpectError(msg || `Expected value not greater than or equal to received`, 'toBeGreaterThanOrEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual value is less than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeLessThan(expected, msg = null) {
        let received = this.received
        let result = received < expected

        if (!result) {
            throw new ExpectError(msg || `Expected value not less than received`, 'toBeLessThan', received, expected)
        }
    }

    /**
     * Asserts that the actual value is less than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeLessThanOrEqual(expected, msg = null) {
        let received = this.received
        let result = received <= expected

        if (!result) {
            throw new ExpectError(msg || `Expected value not less than or equal to received`, 'toBeLessThanOrEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual value is between the specified minimum and maximum values.
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBetween(min, max, msg = null) {
        let received = this.received
        let result = received >= min && received <= max

        if (!result) {
            throw new ExpectError(msg || `Expected value not between ${min} and ${max}`, 'toBeBetween', received, `Between ${min} and ${max}`)
        }
    }

    /**
     * Asserts that the actual value is an integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInteger(msg = null) {
        let received = this.received
        let result = Number.isInteger(received)

        if (!result) {
            throw new ExpectError(msg || `Expected value not integer`, 'toBeInteger', received, 'Integer')
        }
    }

    /**
     * Asserts that the actual value is an integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotInteger(msg = null) {
        let received = this.received
        let result = Number.isInteger(received) === false

        if (!result) {
            throw new ExpectError(msg || `Expected value is integer`, 'toBeInteger', received, 'Integer')
        }
    }

    /**
     * Asserts that the actual value is a safe integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSafeInteger(msg = null) {
        let received = this.received
        let result = Number.isSafeInteger(received)

        if (!result) {
            throw new ExpectError(msg || `Expected value not safe integer`, 'toBeSafeInteger', received, 'Safe Integer')
        }
    }

    /**
     * Asserts that the actual value is a safe integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotSafeInteger(msg = null) {
        let received = this.received
        let result = Number.isSafeInteger(received) === false

        if (!result) {
            throw new ExpectError(msg || `Expected value is safe integer`, 'toBeSafeInteger', received, 'Safe Integer')
        }
    }

    /**
     * Asserts that the actual value is a float.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFloat(msg = null) {
        let received = this.received
        let result = Number(received) === received && received % 1 !== 0

        if (!result) {
            throw new ExpectError(msg || `Expected value not float`, 'toBeFloat', received, 'Float')
        }
    }

    /**
     * Asserts that the actual value is positive.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePositive(msg = null) {
        let received = this.received
        let result = received > 0

        if (!result) {
            throw new ExpectError(msg || `Expected value not positive`, 'toBePositive', received, 'Positive')
        }
    }

    /**
     * Asserts that the actual value is negative.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNegative(msg = null) {
        let received = this.received
        let result = received < 0

        if (!result) {
            throw new ExpectError(msg || `Expected value not negative`, 'toBeNegative', received, 'Negative')
        }
    }

    /**
     * Asserts that the actual value is finite.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFinite(msg = null) {
        let received = this.received
        let result = Number.isFinite(received)

        if (!result) {
            throw new ExpectError(msg || `Expected value not finite`, 'toBeFinite', received, 'Finite')
        }
    }

    /**
     * Asserts that the actual value is a number and not is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNumber(msg = null) {
        let received = this.received
        let result = typeof received === 'number' || !isNaN(received)

        if (!result) {
            throw new ExpectError(msg || `Expected value is not number`, 'toBeNumber', received, 'Number')
        }
    }

    /**
     * Asserts that the actual value is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNaN(msg = null) {
        let received = this.received
        let result = isNaN(received)

        if (!result) {
            throw new ExpectError(msg || `Expected value is not NaN`, 'toBeNaN', received, 'NaN')
        }
    }

    /**
     * Asserts that the actual value is close to the expected value within a certain precision.
     * @param {number} expected - The expected value to compare against.
     * @param {number} [precision=2] - The number of decimal places to consider in the comparison.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeCloseTo(expected, precision = 2, msg = null) {
        let received = this.received
        let result = Math.abs(received - expected) < Math.pow(10, -precision) / 2

        if (!result) {
            throw new ExpectError(msg || `Expected value is not close to`, 'toBeCloseTo', received, expected)
        }
    }

    /**
     * Asserts that the actual function throws an error.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toThrow(msg = null) {
        let received = this.received
        let result = false
        try {
            received.apply()
        } catch (e) {
            result = true
        }

        if (!result) {
            throw new ExpectError(msg || `Expected function to throw error`, 'toThrow', received, 'throw')
        }
    }

    /**
     * Asserts that the actual function throws an error matching the expected value.
     * @param expected - The expected error.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toThrowError(expected, msg = null) {
        let received = this.received
        let result = false
        let message = ``
        try {
            received.apply()
        } catch (e) {
            message = e.message
            result = e.message.match(expected) !== null
        }

        if (!result) {
            throw new ExpectError(msg || `Invalid error message`, 'toThrowError', message, expected)
        }
    }

    /**
     * Asserts that the actual value is a HEX color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHEXColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'hex')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not hex color`, 'toBeHEXColor', received, 'HEX Color')
        }
    }

    /**
     * Asserts that the actual value is an RGB color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRGBColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'rgb')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not rgb color`, 'toBeRGBColor', received, 'RGB Color')
        }
    }

    /**
     * Asserts that the actual value is an RGBA color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRGBAColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'rgba')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not rgba color`, 'toBeRGBAColor', received, 'RGBA Color')
        }
    }

    /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSVColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'hsv')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not hsv color`, 'toBeHSVColor', received, 'HSV Color')
        }
    }

    /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSLColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'hsl')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not hsl color`, 'toBeHSLColor', received, 'HSL Color')
        }
    }

    /**
     * Asserts that the actual value is an HSLA color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSLAColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'hsla')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not hsla color`, 'toBeHSLAColor', received, 'HSLA Color')
        }
    }

    /**
     * Asserts that the actual value is a CMYK color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeCMYKColor(msg = null) {
        let received = this.received
        let result = testValue(received, 'cmyk')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not cmyk color`, 'toBeCMYKColor', received, 'CMYK Color')
        }
    }

    /**
     * Asserts that the actual value is a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeColor(msg = null) {
        let received = this.received
        const testHex = testValue(received, 'hex')
        const testRGB = testValue(received, 'rgb')
        const testRGBA = testValue(received, 'rgba')
        const testHSL = testValue(received, 'hsl')
        const testHSV = testValue(received, 'hsv')
        const testHSLA = testValue(received, 'hsla')
        const testCMYK = testValue(received, 'cmyk')

        const result = testHex || testRGB || testRGBA || testHSL || testHSLA || testCMYK || testHSV

        if (!result) {
            throw new ExpectError(msg || `Expected value is not color`, 'toBeColor', received, 'Color')
        }
    }

    /**
     * Asserts that the actual value is not a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeNotColor(msg = null) {
        let received = this.received
        const testHex = testValue(received, 'hex')
        const testRGB = testValue(received, 'rgb')
        const testRGBA = testValue(received, 'rgba')
        const testHSL = testValue(received, 'hsl')
        const testHSV = testValue(received, 'hsv')
        const testHSLA = testValue(received, 'hsla')
        const testCMYK = testValue(received, 'cmyk')

        const result = !(testHex || testRGB || testRGBA || testHSL || testHSLA || testCMYK || testHSV)

        if (!result) {
            throw new ExpectError(msg || `Expected value is color`, 'toBeNotColor', received, 'Color')
        }
    }

    /**
     * Asserts the mock function was called at least once
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalled(msg = null) {
        let received = this.received
        let result = received.mock.calls.length > 0

        if (!result) {
            throw new ExpectError(msg || `Expected function is not called`, 'toHaveBeenCalled', received.mock.calls.length, 'Called')
        }
    }

    /**
     * Asserts the mock function was called at least once
     * @param expected
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalledTimes(expected, msg = null) {
        let received = this.received
        let result = received.mock.calls.length === expected

        if (!result) {
            throw new ExpectError(msg || `Function was called ${received.mock.calls.length} times instead of ${expected}`, 'toHaveBeenCalledTimes', received.mock.calls.length, expected)
        }
    }

    /**
     * Asserts that the mock function was called with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalledWith(expected, msg = null) {
        let received = this.received
        let result = received.mock.calls.some(call => deepEqual(call, expected))

        if (!result) {
            throw new ExpectError(msg || `Expected function is not called with ${stringify(expected)}`, 'toHaveBeenCalledWith', received.mock.calls, expected)
        }
    }

    /**
     * Asserts that the mock function was called last with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenLastCalledWith(expected, msg = null) {
        let received = this.received
        let result = deepEqual(received.mock.calls[received.mock.calls.length - 1], expected)

        if (!result) {
            throw new ExpectError(msg || `Expected function is not called with ${stringify(expected)}`, 'toHaveBeenLastCalledWith', received.mock.calls, expected)
        }
    }

    /**
     * Asserts that the actual value contains the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toContain(expected, msg = null) {
        let received = this.received
        let result

        if (typeof received === 'object' && !Array.isArray(received)) {
            result = received.hasOwnProperty(expected)
        } else if (Array.isArray(received)) {
            if (Array.isArray(expected)) {
                result = expected.every((v) => received.includes(v))
            } else {
                result = received.includes(expected)
            }
        } else {
            result = received.includes(expected)
        }

        if (!result) {
            throw new ExpectError(msg || `Expected value not contain received`, 'toContain', received, expected)
        }
    }

    /**
     * Asserts that the actual value not contains the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toNotContain(expected, msg = null) {
        let received = this.received
        let result

        if (typeof received === 'object' && !Array.isArray(received)) {
            result = !received.hasOwnProperty(expected)
        } else if (Array.isArray(received)) {
            if (Array.isArray(expected)) {
                result = !expected.every((v) => received.includes(v))
            } else {
                result = !received.includes(expected)
            }
        } else {
            result = !received.includes(expected)
        }

        if (!result) {
            throw new ExpectError(msg || `Expected value contain received`, 'toNotContain', received, expected)
        }
    }

    /**
     * Asserts that the actual value is deeply equal to the expected value.
     * With this method you can compare objects with circular references.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDeepEqual(expected, msg = null) {
        let received = this.received
        let result = deepEqual(received, expected)

        if (!result) {
            throw new ExpectError(msg || `Expected object not equal to received`, 'toBeDeepEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual value is deeply equal to the expected value using a safe comparison.
     * With this method you can compare objects with circular references.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDeepEqualSafe(expected, msg = null) {
        let received = this.received
        const result = stringify(received) === stringify(expected)

        if (!result) {
            throw new ExpectError(msg || `Expected object not equal to received`, 'toBeDeepEqualSafe', received, expected)
        }
    }

    /**
     * Asserts that the actual structure is equal to the expected structure.
     * @param expected - The expected structure.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeObjectStructureEqual(expected, msg = null) {
        let received = this.received
        let result = compareStructure(received, expected)

        if (!result) {
            throw new ExpectError(msg || `Expected object structure not equal to received`, 'toBeObjectStructureEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual array is equal to the expected array.
     * @param expected - The expected array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayEqual(expected, msg = null) {
        let received = this.received
        let result = true

        if (received.length !== expected.length) {
            result = false
        } else {
            for (let i = 0; i < received.length; i++) {
                if (received[i] !== expected[i]) {
                    result = false
                }
            }
        }

        if (!result) {
            throw new ExpectError(msg || `Expected array not equal to received`, 'toBeArrayEqual', received, expected)
        }
    }

    /**
     * Asserts that the actual value is an array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArray(msg = null) {
        let received = this.received
        let result = Array.isArray(received)

        if (!result) {
            throw new ExpectError(msg || `Expected value is not array`, 'toBeArray', received, 'Array')
        }
    }

    /**
     * Asserts that the actual value is sorted.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArraySorted(msg = null) {
        let received = this.received
        let result = checkArraySorted(received)
        let expected = received.slice().sort((a, b) => a - b)

        if (!result) {
            throw new ExpectError(msg || `Expected array is not sorted`, 'toBeArraySorted', received, expected)
        }
    }

    /**
     * Asserts that the actual value is not sorted.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayNotSorted(msg = null) {
        let received = this.received
        let result = checkArraySorted(received) === false
        let expected = received.slice()

        if (!result) {
            throw new ExpectError(msg || `Expected array is sorted`, 'toBeArraySorted', received, expected)
        }
    }

    /**
     * Asserts that values in the array are unique.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayUnique(msg = null) {
        let received = this.received
        let result = new Set(received).size === received.length

        if (!result) {
            throw new ExpectError(msg || `Values in expected array is not unique`, 'toBeArrayUnique', received, 'Unique')
        }
    }

    /**
     * Asserts that values in the array are not unique.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayNotUnique(msg = null) {
        let received = this.received
        let result = new Set(received).size !== received.length

        if (!result) {
            throw new ExpectError(msg || `Values in expected array is unique`, 'toBeArrayNotUnique', received, 'Non Unique')
        }
    }

    /**
     * Asserts that the actual value is a valid IP address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIP(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv4') || testValue(received, 'ipv6')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not IP Address`, 'toBeIP', received, 'IP Address')
        }
    }

    /**
     * Asserts that the actual value isn't a valid IP address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotIP(msg = null) {
        let received = this.received
        let result = !testValue(received, 'ipv4') && !testValue(received, 'ipv6')

        if (!result) {
            throw new ExpectError(msg || `Expected value is IP Address`, 'toBeNotIP', received, 'IP Address')
        }
    }

    /**
     * Asserts that the actual value is a valid IPv4 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv4(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv4')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not IPv4`, 'toBeIPv4', received, 'IPv4')
        }
    }

    /**
     * Asserts that the actual value is a valid IPv6 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv6(msg = null) {
        let received = this.received
        let result = testValue(received, 'ipv6')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not IPv6`, 'toBeIPv6', received, 'IPv6')
        }
    }

    /**
     * Asserts that the actual value is a valid email address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmail(msg = null) {
        let received = this.received
        let result = testValue(received, 'email')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not Email`, 'toBeEmail', received, 'Email')
        }
    }

    /**
     * Asserts that the actual value is a valid URL.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUrl(msg = null) {
        let received = this.received
        let result = testValue(received, 'url')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not URL`, 'toBeUrl', received, 'URL')
        }
    }

    /**
     * Asserts that the actual value is empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmpty(msg = null) {
        let received = this.received
        let result = received.length === 0

        if (!result) {
            throw new ExpectError(msg || `Expected value is not empty`, 'toBeEmpty', received, 'Empty')
        }
    }

    /**
     * Asserts that the actual value is not empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotEmpty(msg = null) {
        let received = this.received
        let result = received.length > 0

        if (!result) {
            throw new ExpectError(msg || `Expected value is empty`, 'toBeNotEmpty', received, 'Not Empty')
        }
    }

    /**
     * Asserts that the array-like object has the expected length.
     * @param {number} expected - The expected length.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasLength(expected, msg = null) {
        let received = this.received
        let result = received.length === expected

        if (!result) {
            throw new ExpectError(msg || `Expected value has not length ${expected}`, 'hasLength', received.length, expected)
        }
    }

    /**
     * Asserts that the actual value is a Base64 encoded string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBase64(msg = null) {
        let received = this.received
        let result = testValue(received, 'base64')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not base64`, 'toBeBase64', received, 'Base64')
        }
    }

    /**
     * Asserts that the actual value is a JSON string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeJson(msg = null) {
        let received = this.received
        let result = /^[\],:{}\s]*$/.test(
            received
                .replace(/\\["\\\/bfnrtu]/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
        )

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a json string`, 'toBeJson', received, 'Json')
        }
    }

    /**
     * Asserts that the actual value is an XML string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeXml(msg = null) {
        let received = this.received
        let result = testValue(received, 'xml')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a valid xml string`, 'toBeXml', received, 'Xml')
        }
    }

    /**
     * Asserts that the actual value has the specified property.
     * @param {string} expected - The expected property name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasProperty(expected, msg = null) {
        let received = this.received
        let result = received[expected] !== undefined

        if (!result) {
            throw new ExpectError(msg || `Expected object has not property ${expected}`, 'hasProperty', received, expected)
        }
    }

    /**
     * Asserts that the actual value has not the specified property.
     * @param {string} expected - The expected property name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoProperty(expected, msg = null) {
        let received = this.received
        let result = received[expected] === undefined

        if (!result) {
            throw new ExpectError(msg || `Expected object has property ${expected}`, 'hasNoProperty', received, expected)
        }
    }

    /**
     * Asserts that the actual value is of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeType(type, msg = null) {
        let received = this.received
        let result = typeof received === type

        if (!result) {
            throw new ExpectError(msg || `Expected value is not ${type}`, 'toBeType', received, type)
        }
    }

    /**
     * Asserts that the actual value is an instance of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInstanceOf(type, msg = null) {
        let received = this.received
        let result = received instanceof type

        if (!result) {
            throw new ExpectError(msg || `Expected value is not instance of ${type}`, 'toBeInstanceOf', received, type)
        }
    }


    /**
     * Asserts that the actual value is a string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeString(msg = null) {
        let received = this.received
        let result = typeof received === 'string'

        if (!result) {
            throw new ExpectError(msg || `Expected value is not string`, 'toBeString', received, 'String')
        }
    }


    /**
     * Asserts that the actual value is a function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFunction(msg = null) {
        let received = this.received
        let result = typeof received === 'function'

        if (!result) {
            throw new ExpectError(msg || `Expected value is not function`, 'toBeFunction', received, 'Function')
        }
    }

    /**
     * Asserts that the actual value is an async function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeAsyncFunction(msg = null) {
        let received = this.received
        let result = received.constructor.name === 'AsyncFunction'

        if (!result) {
            throw new ExpectError(msg || `Expected value is not async function`, 'toBeAsyncFunction', received, 'Async Function')
        }
    }

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDate(msg = null) {
        let received = this.received
        let result = received instanceof Date || testValue(received, 'date') || testValue(received, 'datetime')

        if (!result) {
            throw new ExpectError(msg || `Expected value is not date`, 'toBeDate', received, 'Date')
        }
    }

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDateObject(msg = null) {
        let received = this.received
        let result = received instanceof Date

        if (!result) {
            throw new ExpectError(msg || `Expected value is not datetime object`, 'toBeDateObject', received, 'Date')
        }
    }

    /**
     * Asserts that the actual value is a regular expression.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRegExp(msg = null) {
        let received = this.received
        let result = received instanceof RegExp

        if (!result) {
            throw new ExpectError(msg || `Expected value is not regular expression`, 'toBeRegExp', received, 'RegExp')
        }
    }

    /**
     * Asserts that the actual value is a symbol.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSymbol(msg = null) {
        let received = this.received
        let result = typeof received === 'symbol'

        if (!result) {
            throw new ExpectError(msg || `Expected value is not symbol`, 'toBeSymbol', received, 'Symbol')
        }
    }

    /**
     * Asserts that the actual value is a BigInt.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBigInt(msg = null) {
        let received = this.received
        let result = typeof received === 'bigint'

        if (!result) {
            throw new ExpectError(msg || `Expected value is not big int`, 'toBeBigInt', received, 'BigInt')
        }
    }

    /**
     * Asserts that the actual value is a Map.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeMap(msg = null) {
        let received = this.received
        let result = received instanceof Map

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Map`, 'toBeMap', received, 'Map')
        }
    }

    /**
     * Asserts that the actual value is a Set.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSet(msg = null) {
        let received = this.received
        let result = received instanceof Set

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Set`, 'toBeSet', received, 'Set')
        }
    }

    /**
     * Asserts that the actual value is a WeakMap.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakMap(msg = null) {
        let received = this.received
        let result = received instanceof WeakMap

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a WeakMap`, 'toBeWeakMap', received, 'WeakMap')
        }
    }

    /**
     * Asserts that the actual value is a WeakSet.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakSet(msg = null) {
        let received = this.received
        let result = received instanceof WeakSet

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a WeakSet`, 'toBeWeakSet', received, 'WeakSet')
        }
    }

    /**
     * Asserts that the actual value is an ArrayBuffer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayBuffer(msg = null) {
        let received = this.received
        let result = received instanceof ArrayBuffer

        if (!result) {
            throw new ExpectError(msg || `Expected value is not an ArrayBuffer`, 'toBeArrayBuffer', received, 'ArrayBuffer')
        }
    }

    /**
     * Asserts that the actual value is a Promise.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePromise(msg = null) {
        let received = this.received
        let result = received instanceof Promise

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Promise`, 'toBePromise', received, 'Promise')
        }
    }

    /**
     * Asserts that the actual value is an HTML element.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHtmlElement(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a HTMLElement`, 'toBeHtmlElement', received, 'HTMLElement')
        }
    }

    /**
     * Asserts that the actual value is an HTML node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeNode(msg = null) {
        let received = this.received
        let result = received instanceof Node

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Node`, 'toBeHtmlNode', received, 'Node')
        }
    }

    /**
     * Asserts that the actual value is an HTML document.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeDocument(msg = null) {
        let received = this.received
        let result = received instanceof Document

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Document`, 'toBeDocument', received, 'Document')
        }
    }

    /**
     * Asserts that the actual value is an HTML collection.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHtmlCollection(msg = null) {
        let received = this.received
        let result = received instanceof HTMLCollection

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a HTMLCollection`, 'toBeHtmlCollection', received, 'HTMLCollection')
        }
    }

    /**
     * Asserts that the actual value is a Window object.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeWindow(msg = null) {
        let received = this.received
        let result = received instanceof Window

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Window object`, 'toBeWindow', received, 'Window')
        }
    }

    /**
     * Asserts that the actual value is a Text node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeTextNode(msg = null) {
        let received = this.received
        let result = received instanceof Text

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Text node`, 'toBeTextNode', received, 'Text Node')
        }
    }

    /**
     * Asserts that the HTML element has the specified class.
     * @param {string} expected - The expected class name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasClass(expected, msg = null) {
        let received = this.received
        let result = received.classList && received.classList.contains(expected)

        if (!result) {
            throw new ExpectError(msg || `Expected HTMLElement has not class ${expected}`, 'hasClass', received.className, expected)
        }
    }

    /**
     * Asserts that the HTML element has the specified class.
     * @param {string} expected - The expected class name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoClass(expected, msg = null) {
        let received = this.received
        let result = received.classList && received.classList.contains(expected) === false

        if (!result) {
            throw new ExpectError(msg || `Expected HTMLElement has a class ${expected}`, 'hasClass', received, expected)
        }
    }

    /**
     * Asserts that the HTML element has the specified attribute.
     * @param {string} expected - The expected attribute name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasAttribute(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.hasAttribute(expected)

        if (!result) {
            throw new ExpectError(msg || `Expected element has not attribute ${expected}`, 'hasAttribute', received, expected)
        }
    }

    /**
     * Asserts that the HTML element has the specified attribute.
     * @param {string} expected - The expected attribute name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoAttribute(expected, msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.hasAttribute(expected) === false

        if (!result) {
            throw new ExpectError(msg || `Expected element has an attribute ${expected}`, 'hasAttribute', received, expected)
        }
    }

    /**
     * Asserts that the HTML element has children.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasChildren(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.children.length > 0

        if (!result) {
            throw new ExpectError(msg || `Expected element has no children`, 'hasChildren', received, 'Children')
        }
    }

    /**
     * Asserts that the HTML element has children.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoChildren(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.children.length === 0

        if (!result) {
            throw new ExpectError(msg || `Expected element has children`, 'hasChildren', received, 'Children')
        }
    }

    /**
     * Asserts that the HTML element has a parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasParent(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.parentElement !== null

        if (!result) {
            throw new ExpectError(msg || `Expected element has no parent`, 'hasParent', received, 'Parent')
        }
    }

    /**
     * Asserts that the HTML element has no parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoParent(msg = null) {
        let received = this.received
        let result = received instanceof HTMLElement && received.parentElement === null

        if (!result) {
            throw new ExpectError(msg || `Expected element has a parent`, 'hasParent', received, 'Parent')
        }
    }
}

/**
 * Function to create an expectation object for the given actual value,
 * providing methods to assert various conditions.
 *
 * @param received - The actual value to assert against.
 * @returns An object containing multiple assertion methods.
 */
export function expect(received) {
    return new Expect(received);
}

