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
                result = e.message.match(expected) !== null
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
        toBeInteger: (msg) => {
            let result = Number.isInteger(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not integer`,
                actual,
                expected: 'Integer',
                result,
            }
        },
        toBeSafeInteger: (msg) => {
            let result = Number.isSafeInteger(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not safe integer`,
                actual,
                expected: 'Safe Integer',
                result,
            }
        },
        toBeFloat: (msg) => {
            let result = Number(actual) === actual && actual % 1 !== 0

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not float`,
                actual,
                expected: 'Float',
                result,
            }
        },
        toBePositive: (msg) => {
            let result = actual > 0

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not positive`,
                actual,
                expected: 'Positive',
                result,
            }
        },
        toBeNegative: (msg) => {
            let result = actual < 0

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not negative`,
                actual,
                expected: 'Negative',
                result,
            }
        },
        toBeFinite: (msg) => {
            let result = Number.isFinite(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not finite`,
                actual,
                expected: 'Finite',
                result,
            }
        },
        toBeNumber: (msg) => {
            let result = typeof actual === 'number' || !isNaN(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not number`,
                actual,
                expected: 'Number',
                result,
            }
        },
        toBeNaN: (msg) => {
            let result = isNaN(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not NaN`,
                actual,
                expected: 'NaN',
                result,
            }
        },
        toBeString: (msg) => {
            let result = typeof actual === 'string'

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not string`,
                actual,
                expected: 'String',
                result,
            }
        },
        toBeBoolean: (msg) => {
            let result = typeof actual === 'boolean'

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not boolean`,
                actual,
                expected: 'Boolean',
                result,
            }
        },
        toBeFunction: (msg) => {
            let result = typeof actual === 'function'

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not function`,
                actual,
                expected: 'Function',
                result,
            }
        },
        toBeAsyncFunction: (msg) => {
            let result = actual.constructor.name === 'AsyncFunction'

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not async function`,
                actual,
                expected: 'Async Function',
                result,
            }
        },
        toBeObject: (msg) => {
            let result = typeof actual === 'object'

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not object`,
                actual,
                expected: 'Object',
                result,
            }
        },
        toBeArray: (msg) => {
            let result = Array.isArray(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not array`,
                actual,
                expected: 'Array',
                result,
            }
        },
        toBeDate: (msg) => {
            let result = actual instanceof Date

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not date`,
                actual,
                expected: 'Date',
                result,
            }
        },
        toBeRegExp: (msg) => {
            let result = actual instanceof RegExp

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not regular expression`,
                actual,
                expected: 'RegExp',
                result,
            }
        },
        toBeSymbol: (msg) => {
            let result = typeof actual === 'symbol'

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not symbol`,
                actual,
                expected: 'Symbol',
                result,
            }
        },
        toBeBigInt: (msg) => {
            let result = typeof actual === 'bigint'

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not big int`,
                actual,
                expected: 'BigInt',
                result,
            }
        },
        toBeMap: (msg) => {
            let result = actual instanceof Map

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not map`,
                actual,
                expected: 'Map',
                result,
            }
        },
        toBeSet: (msg) => {
            let result = actual instanceof Set

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not set`,
                actual,
                expected: 'Set',
                result,
            }
        },
        toBeWeakMap: (msg) => {
            let result = actual instanceof Map

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not map`,
                actual,
                expected: 'Map',
                result,
            }
        },
        toBeWeakSet: (msg) => {
            let result = actual instanceof Set

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not set`,
                actual,
                expected: 'Set',
                result,
            }
        },
        toBeArrayBuffer: (msg) => {
            let result = actual instanceof ArrayBuffer

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not array buffer`,
                actual,
                expected: 'ArrayBuffer',
                result,
            }
        },
        toBePromise: (msg) => {
            let result = actual instanceof Promise

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not promise`,
                actual,
                expected: 'Promise',
                result,
            }
        },
        toBeBase64: (msg) => {
            let result = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not base64`,
                actual,
                expected: 'Base64',
                result,
            }
        },
        toBeJson: (msg) => {
            let result = /^[\],:{}\s]*$/.test(actual.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not json`,
                actual,
                expected: 'Json',
                result,
            }
        },
        toBeXml: (msg) => {
            let result = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not xml`,
                actual,
                expected: 'Xml',
                result,
            }
        },
        toBeHEXColor: (msg) => {
            let result = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not hex color`,
                actual,
                expected: 'Hex Color',
                result,
            }
        },
        toBeRGBColor: (msg) => {
            let result = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not rgb color`,
                actual,
                expected: 'RGB Color',
                result,
            }
        },
        toBeRGBAColor: (msg) => {
            let result = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d?\.?\d+)\)$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not rgba color`,
                actual,
                expected: 'RGBA Color',
                result,
            }
        },
        toBeHSLColor: (msg) => {
            let result = /^hsl\((\d{1,3}),(\d{1,3})%,(\d{1,3})%\)$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not hsl color`,
                actual,
                expected: 'HSL Color',
                result,
            }
        },
        toBeHSLAColor: (msg) => {
            let result = /^hsla\((\d{1,3}),(\d{1,3})%,(\d{1,3})%,(\d?\.?\d+)\)$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not hsla color`,
                actual,
                expected: 'HSLA Color',
                result,
            }
        },
        toBeCMYKColor: (msg) => {
            let result = /^cmyk\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})\)$/.test(actual)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not cmyk color`,
                actual,
                expected: 'CMYK Color',
                result,
            }
        },
        toBeColor: (msg) => {
            const testHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(actual)
            const testRGB = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/.test(actual)
            const testRGBA = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d?\.?\d+)\)$/.test(actual)
            const testHSL = /^hsl\((\d{1,3}),(\d{1,3})%,(\d{1,3})%\)$/.test(actual)
            const testHSLA = /^hsla\((\d{1,3}),(\d{1,3})%,(\d{1,3})%,(\d?\.?\d+)\)$/.test(actual)
            const testCMYK = /^cmyk\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})\)$/.test(actual)

            const result = testHex || testRGB || testRGBA || testHSL || testHSLA || testCMYK

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not color`,
                actual,
                expected: 'Color',
                result,
            }
        },
        toBeHtmlElement: (msg) => {
            let result = actual instanceof HTMLElement

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not html element`,
                actual,
                expected: 'HTMLElement',
                result,
            }
        },
        toBeHtmlNode: (msg) => {
            let result = actual instanceof Node

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not html node`,
                actual,
                expected: 'Node',
                result,
            }
        },
        toBeHtmlDocument: (msg) => {
            let result = actual instanceof Document

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not html document`,
                actual,
                expected: 'Document',
                result,
            }
        },
        toBeHtmlCollection: (msg) => {
            let result = actual instanceof HTMLCollection

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not html collection`,
                actual,
                expected: 'HTMLCollection',
                result,
            }
        },
        toBeHtmlWindow: (msg) => {
            let result = actual instanceof Window

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not html window`,
                actual,
                expected: 'Window',
                result,
            }
        },
        toBeHtmlTextNode: (msg) => {
            let result = actual instanceof Text

            return {
                name: result ? 'Test passed' : msg ?? `Expected value is not html text node`,
                actual,
                expected: 'Text',
                result,
            }
        },
        hasClass: (expected, msg) => {
            let result = actual.classList && actual.classList.contains(expected)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value has not class ${expected}`,
                actual,
                expected,
                result,
            }
        },
        hasAttribute: (expected, msg) => {
            let result = actual.hasAttribute(expected)

            return {
                name: result ? 'Test passed' : msg ?? `Expected value has not attribute ${expected}`,
                actual,
                expected,
                result,
            }
        },
        hasProperty: (expected, msg) => {
            let result = actual[expected] !== undefined

            return {
                name: result ? 'Test passed' : msg ?? `Expected value has not property ${expected}`,
                actual,
                expected,
                result,
            }
        },
        hasChildren: (msg) => {
            let result = actual instanceof HTMLElement && actual.children.length > 0

            return {
                name: result ? 'Test passed' : msg ?? `Expected value has no children`,
                actual,
                expected: 'Children',
                result,
            }
        },
        hasParent: (msg) => {
            let result = actual instanceof HTMLElement && actual.parentElement !== null

            return {
                name: result ? 'Test passed' : msg ?? `Expected value has no parent`,
                actual,
                expected: 'Parent',
                result,
            }
        },
        hasNoParent: (msg) => {
            let result = actual instanceof HTMLElement && actual.parentElement === null

            return {
                name: result ? 'Test passed' : msg ?? `Expected value has a parent`,
                actual,
                expected: 'Parent',
                result,
            }
        },
    }
}
