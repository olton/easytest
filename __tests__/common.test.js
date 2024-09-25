function hello() {
    return "Hello"
}

describe(`Common tests suite`, () => {
    it(`says hello`, () => {
        expect(hello()).toBe("Hello")
    })
    it(`To be 2 > 1`, () => {
        expect(2).toBeGreaterThan(1)
    })
})