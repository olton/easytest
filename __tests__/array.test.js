describe(`Array tests suite`, () => {
    it(`Array should be empty`, () => {
        expect([]).toBe([])
    })
    it(`Array should contain 1`, () => {
        expect([1]).toBeArrayEqual([1])
    })
    it(`Array should contain 1, 2, 3`, () => {
        expect([1, 2, 3]).toBeArrayEqual([1, 2, 3])
    })
})