function hello() {
    return "Hello"
}

beforeAll(() => {
    console.log("    >>>>> Before all file")
})

afterAll(() => {
    console.log("    >>>>> After all file")
})

describe(`Common tests suite 1`, () => {
    beforeEach(() => {
        console.log("       >>>>> Before each test")
    })

    afterEach(() => {
        console.log("       >>>>> After each test")
    })

    it(`It1 `, () => {
        return expect(1).toBe(1)
    })
})

describe(`Common tests suite 2`, () => {
    beforeAll(() => {
        console.log("    >>>>> Before all suite")
    })
    afterAll(() => {
        console.log("    >>>>> After all suite")
    })

    it(`says hello`, () => {
        return expect(hello()).toBe("Hello")
    })
    it(`Compare 2 === 2`, () => {
        return expect(2).toBe(2)
    })
})