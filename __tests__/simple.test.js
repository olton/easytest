function hello() {
    return "Hello"
}

test(`says hello`, () => {
    expect(hello()).toBe("Hello")
})
