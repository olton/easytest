/**
 * Represents the result of a test.
 *
 * @interface
 * @property {string} message - The result message of the test.
 * @property {any} actual - The actual value produced by the test.
 * @property {any} expected - The expected value for the test.
 * @property {boolean} result - The result of the test, true if passed, false otherwise.
 */
interface TestResult {
    message: string;
    actual: any;
    expected: any;
    result: boolean;
}

/**
 * MatcherType Interface - Defines the contract for various testing matchers.
 */
interface MatcherType {
    /**
     * Asserts that the actual value is equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBe: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is not equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNot: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual object is equal to the expected object.
     * @param expected - The expected object.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeObject: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is deeply equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEqual: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is not deeply equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotEqual: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value matches the expected pattern.
     * @param expected - The expected pattern.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeMatch: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is defined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDefined: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is undefined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUndefined: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is null.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNull: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is not null.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotNull: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is true.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeTrue: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is false.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFalse: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value contains the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toContain: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is greater than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeGreaterThan: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is greater than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeGreaterThanOrEqual: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is less than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeLessThan: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is less than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeLessThanOrEqual: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual function throws an error.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toThrow: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual function throws an error matching the expected value.
     * @param expected - The expected error.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toThrowError: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual array is equal to the expected array.
     * @param expected - The expected array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayEqual: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is deeply equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDeepEqual: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is deeply equal to the expected value using a safe comparison.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDeepEqualSafe: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid IP address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIP: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid IPv4 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv4: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid IPv6 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv6: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid email address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmail: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid URL.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUrl: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is between the specified minimum and maximum values.
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBetween: (min, max, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeType: (type, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is an instance of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInstanceOf: (type, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmpty: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is not empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotEmpty: (msg: string = null) => TestResult;

    /**
     * Asserts that the array is sorted.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSorted: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is unique.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUnique: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual structure is equal to the expected structure.
     * @param expected - The expected structure.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toStructureEqual: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is an integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInteger: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a safe integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSafeInteger: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a float.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFloat: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is positive.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePositive: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is negative.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNegative: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is finite.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFinite: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a number and not is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNumber: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNaN: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeString: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a boolean.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBoolean: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFunction: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is an async function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeAsyncFunction: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is an array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArray: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDate: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a regular expression.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRegExp: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a symbol.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSymbol: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a BigInt.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBigInt: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a Map.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeMap: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a Set.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSet: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a WeakMap.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakMap: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a WeakSet.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakSet: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is an ArrayBuffer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayBuffer: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a Promise.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePromise: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a Base64 encoded string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBase64: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a JSON string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeJson: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is an XML string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeXml: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a HEX color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHEXColor: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is RGB color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRGBColor: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is RGBA color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRGBAColor: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is HSL color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHSLColor: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is HSLA color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHSLAColor: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is CMYK color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeCMYKColor: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeColor: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is not a color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotColor: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid HTML element.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHtmlElement: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid HTML node.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHtmlNode: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid HTML document.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHtmlDocument: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid HTML collection.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHtmlCollection: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid HTML window.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHtmlWindow: (msg: string = null) => TestResult;

    /**
     * Asserts that the actual value is a valid HTML text node.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHtmlTextNode: (msg: string = null) => TestResult;

    /**
     * Asserts that the HTML element has the specified class.
     * @param {string} expected - The expected class name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasClass: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the HTML element has the specified attribute.
     * @param {string} expected - The expected attribute name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasAttribute: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the HTML element has the specified property.
     * @param {string} expected - The expected property name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test
     */
    hasProperty: (expected: any, msg: string = null) => TestResult;

    /**
     * Asserts that the HTML element has children.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasChildren: (msg: string = null) => TestResult;

    /**
     * Asserts that the HTML element has a parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasParent: (msg: string = null) => TestResult;

    /**
     * Asserts that the HTML element has no a parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoParent: (msg: string = null) => TestResult;

    /**
     * Asserts the mock function was called at least once
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeenCalled: (msg: string = null) => TestResult;

    /**
     * Asserts the mock function was called at least once
     * @param expected
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeenCalledTimes: (expected: number, msg = null) => TestResult;

    /**
     * Asserts that the mock function was called with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeenCalledWith: (expected: any, msg = null) => TestResult;

    /**
     * Asserts that the mock function was called last with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeenLastCalledWith: (expected: any, msg = null) => TestResult;

    /**
     * Asserts that the array-like object has the expected length.
     * @param {number} expected - The expected length.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasLength: (expected: number, msg = null) => TestResult;

    /**
     * Asserts that the actual value is close to the expected value within a certain precision.
     * @param {number} expected - The expected value to compare against.
     * @param {number} [precision=2] - The number of decimal places to consider in the comparison.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeCloseTo: (expected: number, precision = 2, msg = null) => TestResult;

}

/**
 * Creates a new DOM element based on the provided HTML string and options.
 *
 * @param {string} [html=''] - The HTML string to be used for creating the DOM element.
 * @param {Object} [options={}] - Additional options for configuring the DOM element.
 * @return {void} This function does not return a value.
 */
export declare function DOM(html: string = '', options= {}): void;

/**
 * Declares a test suite with a given name and test function.
 *
 * @param name - The name of the test suite.
 * @param fn - The function containing the test cases to execute within the suite.
 * @return void
 */
export declare function describe(name: string, fn: () => void): void;

/**
 * Defines a test case with a given name and function.
 *
 * @param {string} name - The name of the test case.
 * @param {Function} fn - The function containing the test logic.
 * @return {Promise<void>} A promise that resolves when the test case has been executed.
 */
export declare async function it(name: string, fn: () => void): void;

/**
 * Executes a single test function with a given name.
 *
 * @param {string} name - The name of the test.
 * @param {Function} fn - The test function to be executed.
 * @return {void} This function does not return a value.
 */
export declare async function test(name: string, fn: () => void): void;

/**
 * Creates an expectation for a given value.
 * This is typically used in testing frameworks to assert that the provided value
 * meets certain conditions.
 *
 * @param {any} actual - The actual value to be tested.
 * @return {MatcherType} An object containing various methods to assert different conditions on the actual value.
 */
export declare function expect(actual: any): MatcherType;

/**
 * Registers a callback function to be executed once before all tests in a suite.
 *
 * @param fn - The callback function to be executed before all tests.
 * @return void
 */
export declare function beforeAll(fn: () => void): void;

/**
 * Registers a function to be called after all tests have completed in a suite.
 *
 * @param {Function} fn - The function to be executed after all tests.
 * @return {void}
 */
export declare function afterAll(fn: () => void): void;

/**
 * Registers a function to be called before each test case.
 * The provided function will be called before each test case in a test suite.
 *
 * @param fn - The function to execute before each test case.
 * @return void
 */
export declare function beforeEach(fn: () => void): void;

/**
 * Registers a function to be executed after each test case.
 * The provided function will be called after each test case in a test suite.
 *
 * @param {Function} fn - The function to be executed after each test case.
 * @return {void} This function does not return any value.
 */
export declare function afterEach(fn: () => void): void;

/**
 * Mocks a function or object to simulate a specific behavior.
 *
 * @param {Function} fn - The function to be mocked.
 * @return {void} This function does not return any value.
 */
export declare function mock(fn: () => void): void;