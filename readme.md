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
- [x] `toBeTruthy` - check if value is true
- [x] `toBeFalsy` - check if value is false
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
- [x] `toBeSorted` - check if array is sorted
- [x] `toBeUnique` - check if array has unique values
- [x] `toStructureEqual` - check if object has a structure
- [x] `toBeDeepEqual` - check if objects are deeply equal
- [x] `toBeEqualObject` - check if two simple objects are equal, to deep compare use `toBeDeepEqual`

### TypeScript
To use `EasyTest` with TypeScript you need to install `tsx` package.
```bash
npm install tsx -D
```
and then 
```json
{
    "scripts": {
        "test": "easytest --compiler tsx"
    }
}
```

### Current problems
- [ ] Testing async code (maybe we need to create a global queue of tests and then execute this her?)

## License
EasyTest licensed under MIT license.

## Contributing

### Bug Reports & Feature Requests
Use issue tracker to report bugs or request new features.

---
### Copyright
© 2024 Serhii Pimenov. All rights reserved.
