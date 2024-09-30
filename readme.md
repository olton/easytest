# EasyTest

Simple testing framework for JS, TS, written in pure JavaScript.

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
- `mock` - create mock function
- `DOM` - create DOM object (not global)

### Matchers
EasyTest contains a big set of built-in matchers.

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

![verbose-on.png](verbose-on.png)

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

## Include tests
You can specify the files to include in the test run.

```json
{
    "include": ["**/*.spec.{t,j}s", "**/*.spec.{t,j}sx", "**/*.test.{t,j}s", "**/*.test.{t,j}sx"]
}
```

or use argument `--include`.

```json
{
    "scripts": {
        "test": "easytest --include='**/common.test.js,**/common.spec.js'"
    }
}
```

## Exclude files
You can specify the files to exclude from the test run.

```json
{
    "exclude": ["node_modules/**"]
}
```

or use argument `--exclude`.

```json
{
    "scripts": {
        "test": "easytest --exclude='node_modules/**,dist/**'"
    }
}
```

## Executing tests by name
You can run a specific test by name using the `--test` argument.

```json
{
    "scripts": {
        "test": "easytest --test='Compare with 2'"
    }
}
```
In this case only the test with the name includes `Compare with 2` will be executed.

## Extend expect
You can extend the `expect` function with your own matchers.

```javascript
import {Expect} from "../src/expect.js";

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
