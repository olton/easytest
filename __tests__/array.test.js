describe(`Array tests`, () => {
    it('toBeArray [] == []', () => {
        return expect([]).toBeArray([])
    })
    it(`toBeArraySorted [1, 2, 3]`, () => {
        return expect([1, 2, 3]).toBeArraySorted()
    })
    it(`toBeArrayNotSorted [4, 1, 2, 3]`, () => {
        return expect([4, 1, 2, 3]).toBeArrayNotSorted()
    })
    it(`toBeArrayUnique [1, 2, 3]`, () => {
        return expect([1, 2, 3]).toBeArrayUnique()
    })
    it(`toBeArrayNotUnique [1, 2, 3, 3]`, () => {
        return expect([1, 2, 3, 3]).toBeArrayNotUnique()
    })
    it(`hasLength 3`, () => {
        return expect([1, 2, 3]).hasLength(3)
    })
})