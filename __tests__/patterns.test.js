describe(`Patterns tests suite`, () => {
    it(`Good hex color #ff0000`, () => {
        return expect(`#ff0000`).toBeHEXColor()
    })
    it(`Good hex color #ff0`, () => {
        return expect(`#ff0`).toBeHEXColor()
    })
    it(`Bad hex color #ff00`, () => {
        return expect(`#ff00`).toBeHEXColor()
    })
})