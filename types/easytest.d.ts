
/**
 * Interface for interacting with the Document Object Model (DOM).
 */
export declare class DOM {
    /**
     * Setup DOM environment with the provided HTML content and options.
     * @param html
     * @param options
     */
    static setup(html?: string, options?: Object): void

    /**
     * Remove DOM environment.
     */
    static clean: () => void

    /**
     * Flash the document HTML inner.
     */
    static flash: (html?: string) => void

    /**
    * Evaluate script in the DOM environment.
    */
    static eval: (js) => void

    /**
     * Load CSS into document.
     */
    static css: {
        fromString: (css: string) => void,
        fromFile: (path: string) => void,
        fromUrl: (url: string) => void,
    }

    /**
     * Load JS into document.
     */
    static js: {
        fromString: (js: string) => void,
        fromFile: (path: string) => void,
        fromUrl: (url: string) => void,
    }

    /**
     * Set document HTML.
     */
    static html: {
        fromString: (html: string) => void,
        fromFile: (path: string) => void,
        fromUrl: (url: string) => void,
    }
}

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
export declare function it(name: string, fn: () => void): Promise<void>;

/**
 * Executes a single test function with a given name.
 *
 * @param {string} name - The name of the test.
 * @param {Function} fn - The test function to be executed.
 * @return {void} This function does not return a value.
 */
export declare function test(name: string, fn: () => void): Promise<void>;

/**
 * Creates an expectation for a given value.
 * This is typically used in testing frameworks to assert that the provided value
 * meets certain conditions.
 *
 * @param {any} received - The actual value to be tested.
 * @return {Expect} An object containing various methods to assert different conditions on the actual value.
 */
export declare function expect(received: any): Expect;

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
export declare function mocker(fn: () => void): void;

export declare class ExpectError extends Error{
    constructor(message: string, matcher: string, received: any, expected: any)
}

/**
 * The instance of the Expect class
 *
 * @param {any} received - The actual value to be tested.
 */
export declare class Expect {
    /**
     * Creates a new instance of the Expect class with the provided value.
     *
     * @param {any} received - The actual value to be tested.
     */
    constructor(received: any);

    /**
     * Asserts that the actual value is equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBe(expected, msg?: string): void

    /**
     * Asserts that the actual value is not equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNot(expected, msg?: string): void

    /**
     * Asserts that the actual value is strict equal (using ===) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeStrictEqual(expected, msg?: string): void

    /**
     * Asserts that the actual value isn't strict equal (using !==) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotStrictEqual(expected, msg?: string): void

    /**
     * Asserts that the actual value is equal (using ==) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEqual(expected, msg?: string): void

    /**
     * Asserts that the actual value is not equal (using !=) to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotEqual(expected, msg?: string): void

    /**
     * Asserts that the actual object is equal to the expected object.
     * @param expected - The expected object.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeObject(expected, msg?: string): void

    /**
     * Asserts that the actual value is true.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeTrue(msg?: string): void

    /**
     * Asserts that the actual value is false.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFalse(msg?: string): void

    /**
     * Asserts that the actual value is a boolean.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBoolean(msg?: string): void

    /**
     * Asserts that the actual value matches the expected pattern.
     * @param expected - The expected pattern.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toMatch(expected, msg?: string): void

    /**
     * Asserts that the actual value not matches the expected pattern.
     * @param expected - The expected pattern.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toNotMatch(expected, msg?: string): void

    /**
     * Asserts that the actual value is defined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDefined(msg?: string): void

    /**
     * Asserts that the actual value is undefined.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUndefined(msg?: string): void

    /**
     * Asserts that the actual value is null.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNull(msg?: string): void

    /**
     * Asserts that the actual value is not null.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotNull(msg?: string): void

    /**
     * Asserts that the actual value is greater than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeGreaterThan(expected, msg?: string): void

    /**
     * Asserts that the actual value is greater than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeGreaterThanOrEqual(expected, msg?: string): void

    /**
     * Asserts that the actual value is less than the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeLessThan(expected, msg?: string): void

    /**
     * Asserts that the actual value is less than or equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeLessThanOrEqual(expected, msg?: string): void

    /**
     * Asserts that the actual value is between the specified minimum and maximum values.
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBetween(min, max, msg?: string): void

    /**
     * Asserts that the actual value is an integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInteger(msg?: string): void

    /**
     * Asserts that the actual value is an integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotInteger(msg?: string): void

    /**
     * Asserts that the actual value is a safe integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSafeInteger(msg?: string): void

    /**
     * Asserts that the actual value is a safe integer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotSafeInteger(msg?: string): void

    /**
     * Asserts that the actual value is a float.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFloat(msg?: string): void

    /**
     * Asserts that the actual value is positive.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePositive(msg?: string): void

    /**
     * Asserts that the actual value is negative.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNegative(msg?: string): void

    /**
     * Asserts that the actual value is finite.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFinite(msg?: string): void

    /**
     * Asserts that the actual value is a number and not is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNumber(msg?: string): void

    /**
     * Asserts that the actual value is NaN.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNaN(msg?: string): void

    /**
     * Asserts that the actual value is close to the expected value within a certain precision.
     * @param {number} expected - The expected value to compare against.
     * @param {number} [precision=2] - The number of decimal places to consider in the comparison.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeCloseTo(expected, precision = 2, msg?: string): void

    /**
     * Asserts that the actual function throws an error.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toThrow(msg?: string): void

    /**
     * Asserts that the actual function throws an error matching the expected value.
     * @param expected - The expected error.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toThrowError(expected, msg?: string): void

    /**
     * Asserts that the actual value is a HEX color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeHEXColor(msg?: string): void

    /**
     * Asserts that the actual value is an RGB color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRGBColor(msg?: string): void

    /**
     * Asserts that the actual value is an RGBA color.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRGBAColor(msg?: string): void

    /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSVColor(msg?: string): void

    /**
     * Asserts that the actual value is an HSL color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSLColor(msg?: string): void

    /**
     * Asserts that the actual value is an HSLA color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHSLAColor(msg?: string): void

    /**
     * Asserts that the actual value is a CMYK color.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeCMYKColor(msg?: string): void

    /**
     * Asserts that the actual value is a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeColor(msg?: string): void

    /**
     * Asserts that the actual value is not a valid color (HEX, RGB, RGBA, HSL, HSLA, or CMYK).
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeNotColor(msg?: string): void

    /**
     * Asserts the mock function was called at least once
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalled(msg?: string): void

    /**
     * Asserts the mock function was called at least once
     * @param expected
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalledTimes(expected, msg?: string): void

    /**
     * Asserts that the mock function was called with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenCalledWith(expected, msg?: string): void

    /**
     * Asserts that the mock function was called last with specified arguments.
     * @param {Array} expected - The expected arguments.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toHaveBeenLastCalledWith(expected, msg?: string): void

    /**
     * Asserts that the actual value contains the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toContain(expected, msg?: string): void

    /**
     * Asserts that the actual value not contains the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toNotContain(expected, msg?: string): void

    /**
     * Asserts that the actual value is deeply equal to the expected value.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDeepEqual(expected, msg?: string): void

    /**
     * Asserts that the actual value is deeply equal to the expected value using a safe comparison.
     * With this method you can compare objects with circular references.
     * @param expected - The expected value.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDeepEqualSafe(expected, msg?: string): void

    /**
     * Asserts that the actual structure is equal to the expected structure.
     * @param expected - The expected structure.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeObjectStructureEqual(expected, msg?: string): void

    /**
     * Asserts that the actual array is equal to the expected array.
     * @param expected - The expected array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayEqual(expected, msg?: string): void

    /**
     * Asserts that the actual value is an array.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArray(msg?: string): void

    /**
     * Asserts that the actual value is sorted.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArraySorted(msg?: string): void

    /**
     * Asserts that the actual value is not sorted.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayNotSorted(msg?: string): void

    /**
     * Asserts that values in the array are unique.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayUnique(msg?: string): void

    /**
     * Asserts that values in the array are not unique.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayNotUnique(msg?: string): void

    /**
     * Asserts that the actual value is a valid IP address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIP(msg?: string): void

    /**
     * Asserts that the actual value isn't a valid IP address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotIP(msg?: string): void

    /**
     * Asserts that the actual value is a valid IPv4 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv4(msg?: string): void

    /**
     * Asserts that the actual value is a valid IPv6 address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeIPv6(msg?: string): void

    /**
     * Asserts that the actual value is a valid email address.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmail(msg?: string): void

    /**
     * Asserts that the actual value is a valid URL.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeUrl(msg?: string): void

    /**
     * Asserts that the actual value is empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeEmpty(msg?: string): void

    /**
     * Asserts that the actual value is not empty.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeNotEmpty(msg?: string): void

    /**
     * Asserts that the array-like object has the expected length.
     * @param {number} expected - The expected length.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasLength(expected, msg?: string): void

    /**
     * Asserts that the actual value is a Base64 encoded string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBase64(msg?: string): void

    /**
     * Asserts that the actual value is a JSON string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeJson(msg?: string): void

    /**
     * Asserts that the actual value is an XML string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeXml(msg?: string): void

    /**
     * Asserts that the actual value has the specified property.
     * @param {string} expected - The expected property name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasProperty(expected, msg?: string): void

    /**
     * Asserts that the actual value has not the specified property.
     * @param {string} expected - The expected property name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoProperty(expected, msg?: string): void

    /**
     * Asserts that the actual value is of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeType(type, msg?: string): void

    /**
     * Asserts that the actual value is an instance of the specified type.
     * @param type - The expected type.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeInstanceOf(type, msg?: string): void


    /**
     * Asserts that the actual value is a string.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeString(msg?: string): void


    /**
     * Asserts that the actual value is a function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeFunction(msg?: string): void

    /**
     * Asserts that the actual value is an async function.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeAsyncFunction(msg?: string): void

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDate(msg?: string): void

    /**
     * Asserts that the actual value is a date.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeDateObject(msg?: string): void

    /**
     * Asserts that the actual value is a regular expression.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeRegExp(msg?: string): void

    /**
     * Asserts that the actual value is a symbol.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSymbol(msg?: string): void

    /**
     * Asserts that the actual value is a BigInt.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeBigInt(msg?: string): void

    /**
     * Asserts that the actual value is a Map.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeMap(msg?: string): void

    /**
     * Asserts that the actual value is a Set.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeSet(msg?: string): void

    /**
     * Asserts that the actual value is a WeakMap.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakMap(msg?: string): void

    /**
     * Asserts that the actual value is a WeakSet.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeWeakSet(msg?: string): void

    /**
     * Asserts that the actual value is an ArrayBuffer.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBeArrayBuffer(msg?: string): void

    /**
     * Asserts that the actual value is a Promise.
     * @param msg - The message to display if the assertion fails.
     * @returns The result of the test.
     */
    toBePromise(msg?: string): void

    /**
     * Asserts that the actual value is an HTML element.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHtmlElement(msg?: string): void

    /**
     * Asserts that the actual value is an HTML node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeNode(msg?: string): void

    /**
     * Asserts that the actual value is an HTML document.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeDocument(msg?: string): void

    /**
     * Asserts that the actual value is an HTML collection.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHtmlCollection(msg?: string): void

    /**
     * Asserts that the actual value is a Window object.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeWindow(msg?: string): void

    /**
     * Asserts that the actual value is a Text node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeTextNode(msg?: string): void

    /**
     * Asserts that the HTML element has the specified class.
     * @param {string} expected - The expected class name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasClass(expected, msg?: string): void

    /**
     * Asserts that the HTML element has the specified class.
     * @param {string} expected - The expected class name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoClass(expected, msg?: string): void

    /**
     * Asserts that the HTML element has the specified attribute.
     * @param {string} expected - The expected attribute name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasAttribute(expected, msg?: string): void

    /**
     * Asserts that the HTML element has the specified attribute.
     * @param {string} expected - The expected attribute name.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoAttribute(expected, msg?: string): void

    /**
     * Asserts that the HTML element has children.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasChildren(msg?: string): void

    /**
     * Asserts that the HTML element has children.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoChildren(msg?: string): void

    /**
     * Asserts that the HTML element has a parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasParent(msg?: string): void

    /**
     * Asserts that the HTML element has no parent.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    hasNoParent(msg?: string): void;
}