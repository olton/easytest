import {ExpectError} from "./errors.js";
import checkArraySorted from "../helpers/check-array-sorted.js";

export default {
    /**
     * Asserts that the actual value is empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmpty(msg = null) {
        let received = this.received
        let result = "length" in received && received.length === 0

        if (!result) {
            throw new ExpectError(msg || `Expected value is not empty`, 'toBeEmpty', received, 'Empty')
        }
    },

    /**
     * Asserts that the actual value is not empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotEmpty(msg = null) {
        let received = this.received
        let result = "length" in received && received.length > 0

        if (!result) {
            throw new ExpectError(msg || `Expected value is empty`, 'toBeNotEmpty', received, 'Not Empty')
        }
    },

    /**
     * Asserts that the array-like object has the expected length.
     * @param {number} expected - The expected length.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasLength(expected, msg = null) {
        let received = this.received
        let result = "length" in received && received.length === expected

        if (!result) {
            throw new ExpectError(msg || `Expected value has not length ${expected}`, 'hasLength', received.length, expected)
        }
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },


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
    },

    /**
     * Asserts that the actual value is an array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArray(msg = null) {
        let received = this.received
        let result = Array.isArray(received)

        if (!result) {
            throw new ExpectError(msg || `Expected value is not an array`, 'toBeArray', received, 'Array')
        }
    },
}