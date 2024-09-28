# EasyTest

Simple testing framework for JS, TS. 
Written in pure JavaScript. 
JavaScript and TypeScript tests. 
There is support for asynchronous code testing and TypeScript testing out of the box.
Global DOM object for testing out of the box.

---

Support for PayPal to **serhii@pimenov.com.ua**

---

[![NPM Version](https://img.shields.io/npm/v/@olton/easytest)](https://www.npmjs.com/package/@olton/easytest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?color=7852a9)](https://opensource.org/licenses/MIT)

---

![verbose-off.png](verbose-off.png)

---

## Installation

```bash
npm install @olton/easytest -D
```

## Usage

To use `EasyTest` you don't need to import `it`, `test` or `describe` in your test file.
But you must return value from `it` or `test` function.

> ### Each test must contain one `expect` function and return it.

Create a test file with `*.test.js` or `*.test.ts` extension.
You can use both of them in the same project.
For support `TypeScript` you need to install `tsx` package (read below).
```javascript
function hello() {
    return "Hello"
}

describe(`Common tests suite`, () => {
    it(`says hello`, () => {
        return expect(hello()).toBe("Hello")
    })
})

test(`Bad test 2 !== 1`, () => {
    return expect(2).toBe(1)
})

```

### Async tests
```javascript
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 1000);
    });
}

describe('Async function tests', async () => {
    it('should return data after 1 second', async () => {
        const data = await fetchData();
        return expect(data).toBe("Bad Data");
    });
});
```

> **Each test must contain one `expect` function and return it.**

Update `package.json` to run tests with `easytest` command.
```json
{
    "scripts": {
        "test": "easytest"
    }
}
```

### Functions
- `describe` - create test suite
- `it` - create a test case
- `expect` - create assertion
- `beforeEach` - run before each test case
- `afterEach` - run after each test case
- `beforeAll` - run before all test cases
- `afterAll` - run after all test cases
- `test` - create simple test
- `DOM` - create DOM object (not global)

### Matchers
- [x] `toBe` - compare values with `===`
- [x] `toBeNot` - compare values with `!==`
- [x] `toBeEqual` - compare values with `==`
- [x] `toBeNotEqual` - compare values with `!=`
- [x] `toBeMatch` - compare strings with regex
- [x] `toBeDefained` - check if value is defined
- [x] `toBeUndefined` - check if value is undefined
- [x] `toThrow` - check if function throws an error
- [x] `toThrowError` - check if function throws an error with a specific message
- [x] `toBeGreaterThan` - check if value is greater than
- [x] `toBeGreaterThanOrEqual` - check if value is greater than
- [x] `toBeLessThan` - check if value is less than
- [x] `toBeLessThanOrEqual` - check if value is less than
- [x] `toBeNull` - check if value is null
- [x] `toBeNotNull` - check if value is not null
- [x] `toBeTrue` - check if value is true
- [x] `toBeFalse` - check if value is false
- [x] `toContain` - check if an array contains value or string contains substring
- [x] `toBeArrayEqual` - check if arrays are equal
- [x] `toBeIP` - check if string is IPv4 address
- [x] `toBeIPv4` - check if string is IPv4 address
- [x] `toBeIPv6` - check if string is IPv6 address
- [x] `toBeEmail` - check if string is email address
- [x] `toBeUrl` - check if string is url address
- [x] `toBeBetween` - check if value between two values
- [x] `toBeType` - check if value is of a specific type
- [x] `toBeInstanceOf` - check if value is instance of a specific class
- [x] `toBeEmpty` - check if value is empty
- [x] `toBeNotEmpty` - check if value is not empty
- [x] `toBeSorted` - check if an array is sorted
- [x] `toBeUnique` - check if array has unique values
- [x] `toStructureEqual` - check if an object has a structure
- [x] `toBeDeepEqual` - check if objects are deeply equal
- [x] `toBeEqualObject` - check if two simple objects are equal, to deep compare use `toBeDeepEqual`
- [x] `toBeInteger` - check if value is integer
- [x] `toBeSafeInteger` - check if value is safe integer
- [x] `toBeFloat` - check if value is float
- [x] `toBePositive` - check if value is positive
- [x] `toBeNegative` - check if value is negative
- [x] `toBeFinite` - check if value is finite
- [x] `toBeNumber` - check if value is number
- [x] `toBeNaN` - check if value is NaN
- [x] `toBeString` - check if value is string
- [x] `toBeBoolean` - check if value is boolean
- [x] `toBeFunction` - check if value is function
- [x] `toBeAsyncFunction` - check if value is async function
- [x] `toBeObject` - check if value is an object
- [x] `toBeArray` - check if value is an array
- [x] `toBeDate` - check if value is date
- [x] `toBeRegExp` - check if value is regular expression
- [x] `toBeSymbol` - check if value is symbol
- [x] `toBeBigInt` - check if value is big int
- [x] `toBeMap` - check if value is a map
- [x] `toBeSet` - check if value is set
- [x] `toBeWeakMap` - check if value is a weak map
- [x] `toBeWeakSet` - check if value is weak set
- [x] `toBeArrayBuffer` - check if value is array buffer
- [x] `toBePromise` - check if value is promise
- [x] `toBeBase64` - check if string is base64
- [x] `toBeJson` - check if string is JSON
- [x] `toBeXml` - check if string is XML
- [x] `toBeHEXColor` - check if string is hex color
- [x] `toBeRGBColor` - check if string is RGB color
- [x] `toBeRGBAColor` - check if string is RGBA color
- [x] `toBeHSLColor` - check if string is HSL color
- [x] `toBeHSLAColor` - check if string is HSLA color
- [x] `toBeSMYKColor` - check if string is a cmyk color
- [x] `toBeColor` - check if string is color
- [x] `toBeHtmlElement` - check if object is HTML element
- [x] `toBeHtmlNode` - check if an object is HTML node
- [x] `toBeHtmlTextNode` - check if an object is HTML node
- [x] `toBeHtmlCollection` - check if an object is an HTML collection
- [x] `toBeHtmlDocument` - check if an object is an HTML document
- [x] `toBeHtmlWindow` - check if an object is an HTML window
- [x] `hasClass` - check if an HTML element has class
- [x] `hasAttribute` - check if an HTML element has attribute
- [x] `hasProperty` - check if an object has property
- [x] `hasChildren` - check if an HTML element has children
- [x] `hasParent` - check if an HTML element has parent
- [x] `hasNoParent` - check if an HTML element hasn't a parent

### TypeScript
To use `EasyTest` with TypeScript you need to install `tsx` package.
```bash
npm install tsx -D
```
and then 
```json
{
    "scripts": {
        "test": "cross-env NODE_OPTIONS=\"--import tsx\" easytest"
    }
}
```

### cross-env
Run scripts that set and use environment variables across platforms.
```bash
npm install --save-dev cross-env
```

### Environment variables to support TypeScript

**powershell**
```powershell
$env:NODE_OPTIONS="--import tsx"
```

**linux**, **macos**
```bash
export NODE_OPTIONS="--import tsx"
```

**cmd**
```cmd
set NODE_OPTIONS="--import tsx"
```

## Configuration
To configure `EasyTest` you need to create a `easytest.config.json` file in the root of your project.
Also, you can use argument `--config fileName` to specify a configuration file.

```json
{
    "scripts": {
        "test": "easytest --config myconfig.json"
    }
}
```

**The default values are:**
```json
{
  "include": ["**/*.spec.{t,j}s", "**/*.spec.{t,j}sx", "**/*.test.{t,j}s", "**/*.test.{t,j}sx"],
  "exclude": ["node_modules/**"],
  "coverage": false,
  "verbose": false
}
```

### Verbose
In verbose mode, you will see the detailed results in the console.

![img_1.png](verbose-on.png)

To enable `verbose` mode, set parameter **verbose** to **true** in config file or use argument `--verbose`.

```json
{
    "scripts": {
        "test": "easytest --verbose"
    }
}
```

## Coverage

EasyTest has a built-in coverage tool.

![Coverage](coverage.png)

To enable `coverage`, set parameter **coverage** to **true** in config file or use argument `--coverage`.

```json
{
    "scripts": {
        "test": "easytest --coverage"
    }
}
```

## License
EasyTest licensed under MIT license.

## Contributing

### Bug Reports & Feature Requests
Use issue tracker to report bugs or request new features.

---
### Copyright
© 2024 Serhii Pimenov. All rights reserved.
