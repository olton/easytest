describe(`Throw tests suite`, () => {
    it(`throws an error`, () => {
        expect(() => {
            throw new Error(`Error message`)
        }).toThrow()
    })

    it(`error message`, () => {
        expect(() => {
            throw new Error(`Error message`)
        }).toThrowError(`Error message`)
    })
})