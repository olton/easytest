import {ExpectError} from "./errors.js";

export default {
    /**
     * Asserts that the actual value is an HTML element.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHtmlElement(msg = null) {
        let received = this.received
        let result = typeof HTMLElement !== "undefined" && received instanceof HTMLElement

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a HTMLElement`, 'toBeHtmlElement', received, 'HTMLElement')
        }
    },

    /**
     * Asserts that the actual value is an HTML node.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeNode(msg = null) {
        let received = this.received
        let result = typeof Node !== "undefined" && received instanceof Node

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Node`, 'toBeHtmlNode', received, 'Node')
        }
    },

    /**
     * Asserts that the actual value is an HTML document.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeDocument(msg = null) {
        let received = this.received
        let result = typeof document !== "undefined" && received instanceof document

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Document`, 'toBeDocument', received, 'Document')
        }
    },

    /**
     * Asserts that the actual value is an HTML collection.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeHtmlCollection(msg = null) {
        let received = this.received
        let result = typeof HTMLCollection !== "undefined" && received instanceof HTMLCollection

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a HTMLCollection`, 'toBeHtmlCollection', received, 'HTMLCollection')
        }
    },

    /**
     * Asserts that the actual value is a Window object.
     * @param {string|null} [msg=null] - The message to display if the assertion fails.
     * @returns {Object} The result of the test.
     */
    toBeWindow(msg = null) {
        let received = this.received
        let result = typeof window !== "undefined" && received instanceof window

        if (!result) {
            throw new ExpectError(msg || `Expected value is not a Window object`, 'toBeWindow', received, 'Window')
        }
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },
}