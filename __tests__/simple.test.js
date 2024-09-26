function hello() {
    return "Hello"
}

test(`says hello`, () => {
    return expect(hello()).toBe("Hello")
})

test(`Failed 2 !== 1`, () => {
    return expect(2).toBe(1)
})
