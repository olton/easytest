import {deepEqual} from "./helpers/deep-equal.js";

export function expect (actual) {
    return {
        toBe: (expected) => {
            let result = deepEqual(actual, expected)
            if (!result) {
                throw new Error(`Expected value not equal to received`)
            }
        },
        toEqual: (expected) => {
            let result = actual == expected
            if (!result) {
                throw new Error(`Expected value not equal to received`)
            }
        },
        toMatch: (expected) => {
            let result = actual.match(expected)
            if (!result) {
                throw new Error(`Expected object not equal to received`)
            }
        },
        toBeDefined: () => {
            let result = actual !== undefined
            if (!result) {
                throw new Error(`Expected value is undefined`)
            }
        },
        toBeUndefined: () => {
            let result = actual === undefined
            if (!result) {
                throw new Error(`Expected value is defined`)
            }
        },
        toBeNull: () => {
            let result = actual === null
            if (!result) {
                throw new Error(`Expected value is not null`)
            }
        },
        toBeTruthy: () => {
            let result = actual === true
            if (!result) {
                throw new Error(`Expected value is not true`)
            }
        },
        toBeFalsy: () => {
            let result = actual === false
            if (!result) {
                throw new Error(`Expected value is not false`)
            }
        },
        toContain: (expected) => {
            let result = actual.includes(expected)
            if (!result) {
                throw new Error(`The value is not contains the expected value`)
            }
        },
        toBeGreaterThan: (expected) => {
            let result = actual > expected
            if (!result) {
                throw new Error(`The value must be a greater than the expected value`)
            }
        },
        toBeLessThan: (expected) => {
            let result = actual < expected
            if (!result) {
                throw new Error(`The value must be a less than the expected value`)
            }
        },
        toThrow: () => {
            let result = false
            try {
                actual()
            } catch (e) {
                result = true
            }
            if (!result) {
                throw new Error(`The code is expected to throw an Exception`)
            }
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
            if (!result) {
                throw new Error(`The error message is expected to be "${expected}" but received "${message}"`)
            }
        },
        toBeArrayEqual: (expected) => {
            if (actual.length !== expected.length) {
                throw new Error(`The array length is not equal`)
            }

            for (let i = 0; i < actual.length; i++) {
                if (actual[i] !== expected[i]) {
                    throw new Error(`The array value is not equal at index ${i}`)
                }
            }
        },
    }
}
