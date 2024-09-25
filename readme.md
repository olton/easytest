# EasyTest

Simple javascript test framework.

## Installation

```bash
npm install easytest -D
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
- `toBe` - compare values
- `toEqual` - compare objects
- `toMatch` - compare strings with regex
- `toBeDefained` - check if value is defined
- `toBeUndefined` - check if value is undefined
- `toThrow` - check if function throws an error
- `toThrowError` - check if function throws an error
- `toBeGreaterThan` - check if value is greater than
- `toBeLessThan` - check if value is less than
- `toBeNull` - check if value is null
- `toBeTruthy` - check if value is true
- `toBeFalsy` - check if value is false
- `toContain` - check if array contains value or string contains substring
- `toBeArrayEqual` - check if arrays are equal

### Not implemented
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
