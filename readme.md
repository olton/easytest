# EasyTest

Simple testing framework for JavaScript and TypeScript, written in pure JavaScript.

---

> ## https://easy.org.ua/

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


---

![verbose-off.png](verbose-off.png)

---

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
- `expect` - create assertion
- `beforeEach` - run before each test case
- `afterEach` - run after each test case
- `beforeAll` - run before all test cases
- `afterAll` - run after all test cases
- `test` - create simple test
- `mocker` - create mock function
- `DOM` - create DOM object (not global)

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

## Configuration
To configure `EasyTest` you need to create a `easytest.json` file in the root of your project.
Also, you can use argument `--config=fileName` to specify a configuration file.

```json
{
    "scripts": {
        "test": "easytest --config=myconfig.json"
    }
}
```

EasyTest designed as a config-free testing framework. But you can configure it to your needs.
**The default values are:**
```json
{
  "include": ["**/*.spec.{t,j}s", "**/*.spec.{t,j}sx", "**/*.test.{t,j}s", "**/*.test.{t,j}sx"],
  "exclude": ["node_modules/**"],
  "coverage": false,
  "verbose": false,
  "dom": false,
  "test": "*",  
  "report": {
    "type": "lcov",
    "dir": "coverage"
  }
}
```

You can use cli arguments to configure EasyTest:

- `--config=file_name.json` - path to the configuration file.
- `--coverage` - enable coverage tool.
- `--verbose` - enable verbose mode.
- `--include=**/*.spec.{t,j}s` - include files for testing.
- `--exclude=node_modules/**` - exclude files from testing.
- `--test=test_name` - execute only tests whose name contains value.
- `--dom` - enable global DOM.

```json
{
  "scripts": {
    "test": "easytest --coverage --verbose --include=**/core.spec.{t,j}s"
  }
}
```

## DOM Environment
EasyTest has a global DOM object for testing HTML objects (we use `JSDOM` to create DOM environment).
To enable global DOM, you need to use parameter `--dom` in the command line, or set `dom` to `true` in the configuration file.

```json
{
    "scripts": {
        "test": "easytest --dom"
    }
}
```

## Extend expect
You can extend the `expect` function with your own matchers.

```javascript
import {Expect} from "@olton/easytest";

class MyExpect extends Expect {
    toBeEven() {
        let received = this.received
        let result = received % 2 === 0
        if (!result) {
            this.message = `Expected ${received} to be even`
        }
    }
}

const expect = (received) => new MyExpect(received)

test(`Custom expect`, () => {
    expect(2).toBeEven()
})
```

## License
EasyTest licensed under MIT license.

## Contributing

### Bug Reports & Feature Requests
Use issue tracker to report bugs or request new features.

---
### Copyright
© 2024 Serhii Pimenov. All rights reserved.
