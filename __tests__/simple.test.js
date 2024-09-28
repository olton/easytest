function hello() {
    return "Hello"
}

test(`says hello`, () => {
    return expect(hello()).toBe("Hello")
})

test(`Compare 2 === 2`, () => {
    return expect(2).toBe(2, "2 === 2")
})
