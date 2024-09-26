# EasyTest

Simple javascript test framework. The framework is developed for testing internal products: EasyData, EasyQuery, Metro UI.

[![NPM Version](https://img.shields.io/npm/v/@olton/easytest)](https://www.npmjs.com/package/@olton/easytest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?color=7852a9)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @olton/easytest -D
```

## Usage

To use `EasyTest` you don't need to import `it` or `describe` in your test file.


Create test file with `*.test.js` extension.
```javascript
function hello() {
    return "Hello"
}

describe(`Common tests suite`, () => {
    it(`says hello`, () => {
        expect(hello()).toBe("Hello")
    })
})
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
- `it` - create test case
- `expect` - create assertion
- `beforeEach` - run before each test case
- `afterEach` - run after each test case
- `beforeAll` - run before all test cases
- `afterAll` - run after all test cases
- `test` - create simple test

### Matchers
- [x] `toBe` - compare values with `===`
- [x] `toEqual` - compare values with `==`
- [x] `toMatch` - compare strings with regex
- [x] `toBeDefained` - check if value is defined
- [x] `toBeUndefined` - check if value is undefined
- [x] `toThrow` - check if function throws an error
- [x] `toThrowError` - check if function throws an error with a specific message
- [x] `toBeGreaterThan` - check if value is greater than
- [ ] `toBeGreaterThanOrEqual` - check if value is greater than
- [x] `toBeLessThan` - check if value is less than
- [ ] `toBeLessThanOrEqual` - check if value is less than
- [x] `toBeNull` - check if value is null
- [x] `toBeTruthy` - check if value is true
- [x] `toBeFalsy` - check if value is false
- [x] `toContain` - check if an array contains value or string contains substring
- [x] `toBeArrayEqual` - check if arrays are equal
- [ ] `toBeIPv4` - check if string is IPv4 address
- [ ] `toBeIPv6` - check if string is IPv6 address
- [ ] `toBeEmail` - check if string is email address
- [ ] `toBeUrl` - check if string is url address
- [ ] `toBeBetween` - check if value between two values

### Current problems
- [ ] Testing async code
- [ ] Testing typescript without compiling

## License
EasyTest licensed under MIT license.

## Contributing

### Bug Reports & Feature Requests
Use issue tracker to report bugs or request new features.

---
### Copyright
© 2024 Serhii Pimenov. All rights reserved.
