function hello() {
    return "Hello"
}

describe(`Common tests suite 1`, () => {
    afterEach(() => {
        console.log("       >>>>> After each test")
    })

    it(`It1 `, () => {
        return expect(1).toBe(1)
    })
})

describe(`Common tests suite 2`, () => {
    it(`says hello`, () => {
        return expect(hello()).toBe("Hello")
    })
    it(`Compare 2 === 2`, () => {
        return expect(2).toBe(2)
    })
})