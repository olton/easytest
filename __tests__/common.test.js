function hello() {
    return "Hello"
}

describe(`Common tests suite`, () => {
    it(`says hello`, () => {
        return expect(hello()).toBe("Hello")
    })
    it(`To be 2 === 2`, () => {
        return expect(2).toBe(2)
    })
})