beforeEach(() => {
    console.log("       >>>>> before each <<<<<")
})

describe(`Array tests suite`, () => {
    it(`Array should be empty`, () => {
        return expect([]).toBeEmpty()
    })
    it(`Array should contain 1`, () => {
        return expect([1]).toBeArrayEqual([1])
    })
    it(`Array should contain 1, 2, 3`, () => {
        return expect([1, 2, 3]).toBeArrayEqual([1, 2, 3])
    })
    it(`Array [1, 2, 3] is sorted`, () => {
        return expect([1, 2, 3]).toBeSorted()
    })
    it(`Array [1, 3, 2] is not sorted`, () => {
        return expect([1, 3, 2]).toBeSorted()
    })
})