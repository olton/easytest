# EasyTest

Simple testing framework for JavaScript and TypeScript, written in pure JavaScript.

---

Documentation: https://easy.org.ua/

---

Core features:
- No need to import `it`, `test`, `describe` or `ecpext` in your test file. These functions are available globally.
- You can use both `js` and `ts` test files in the same project.
- Asynchronous code testing.
- TypeScript testing out of the box.
- Global DOM object for testing HTML objects.
- Built-in coverage tool.
- Verbose or non verbose mode.
- Mock functions.
- Big set of built-in matchers.
- Extend `expect` function with your own matchers.
- Compatible with `codecov` report viewer.
- A lot of expects in one test case.
- Setup and Teardown functions (`beforeEach`, `afterEach`, `beforeAll`, `afterAll`).
---

Support for PayPal to **serhii@pimenov.com.ua**

---

[![NPM Version](https://img.shields.io/npm/v/@olton/easytest?color=green)](https://www.npmjs.com/package/@olton/easytest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?color=7852a9)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/olton/easytest/branch/master/graph/badge.svg?token=7HT3E91GUA)](https://codecov.io/gh/olton/easytest)
![NPM Downloads](https://img.shields.io/npm/dw/%40olton%2Feasytest)


## Installation

```bash
npm install @olton/easytest -D
```

## Usage

To use `EasyTest` you don't need to import `it`, `test` or `describe` in your test file.
Create a test file with `*.test.js` or `*.test.ts` extension (for example).
You can use both of them in the same project.

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
- `test` - create simple test
- `expect` - create assertion
- `beforeEach` - run before each test case
- `afterEach` - run after each test case
- `beforeAll` - run before all test cases
- `afterAll` - run after all test cases
- `mock` - create mock function

### Matchers
EasyTest contains a big set of built-in matchers:

- A simple comparison
- A strong comparison
- Type checking
- Number checking
- String checking
- Array checking
- Object checking
- Color checking
- IP, Email, Url checking
- JSON, XML checking
- Date, RegExp, Symbol checking
- Function checking
- HTML element checking
- and more...


### TypeScript
To use `EasyTest` with TypeScript you need to install `tsx` package.
```bash
npm install -D tsx cross-env
```
and then 
```json
{
    "scripts": {
        "test": "cross-env NODE_OPTIONS=\"--import tsx\" easytest"
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
© 2024-2025 [Serhii Pimenov](mainto:serhii@pimenov.com.ua). All rights reserved.
