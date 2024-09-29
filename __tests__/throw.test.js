beforeAll(() => {
    console.log("    >>>>> Before throw test suite")
})

afterAll(() => {
    console.log("    >>>>> After throw test suite")
})

describe(`Throw tests suite`, () => {
    it(`throws an error`, () => {
        return expect(() => {
            throw new Error(`Error message`)
        }).toThrow()
    })

    it(`error message`, () => {
        return expect(() => {
            throw new Error(`Error message`)
        }).toThrowError(`Error message`)
    })
})