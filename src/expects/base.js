import {ExpectError} from "./errors.js";

export default {
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
    },

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
    },

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
    },

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
    },

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
    },

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
    },
}