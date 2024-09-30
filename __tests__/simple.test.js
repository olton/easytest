function hello() {
    return "Hello"
}

beforeEach(() => {
    console.log("Before each")
})

afterEach(() => {
    console.log("After each")
})

test(`says hello`, () => {
    return expect(hello()).toBe("Hello")
})

test(`Compare 2 === 1`, () => {
    return expect(2).toBe(1, "2 !== 1")
})
