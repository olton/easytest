describe(`Array tests suite`, () => {
    it(`Array should be empty`, () => {
        expect([]).toBeEmpty()
    })
    it(`Array should contain 1`, () => {
        expect([1]).toBeArrayEqual([1])
    })
    it(`Array should contain 1, 2, 3`, () => {
        expect([1, 2, 3]).toBeArrayEqual([1, 2, 3])
    })
    it(`Array [1, 2, 3] is sorted`, () => {
        expect([1, 2, 3]).toBeSorted()
    })
    it(`Array [1, 3, 2] is not sorted`, () => {
        expect([1, 3, 2]).toBeSorted()
    })
})