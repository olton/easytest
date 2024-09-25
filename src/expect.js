let expect = (actual) => {
    return {
        toBe: (expected) => {
            if (actual === expected) {
                global.__tests.passed++
                itScope.expects.push({
                    name: `Expect ${actual} toBe ${expected}`,
                    actual,
                    expected,
                    result: true,
                })
            } else {
                global.__tests.failed++
                itScope.expects.push({
                    name: `Expect ${actual} toBe ${expected}`,
                    actual,
                    expected,
                    result: false,
                })
            }
        },
        toEqual: (expected) => {
            if (actual == expected) {
                global.__tests.passed++
                itScope.expects.push({
                    name: `Expect ${actual} toEqual ${expected}`,
                    actual,
                    expected,
                    result: true,
                })
            } else {
                global.__tests.passed++
                itScope.expects.push({
                    name: `Expect ${actual} toEqual ${expected}`,
                    actual,
                    expected,
                    result: false,
                })
            }
        },
    }
}
