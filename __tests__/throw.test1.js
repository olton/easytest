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