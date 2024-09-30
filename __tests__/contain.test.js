describe(`Contain tests`, () => {
    it('[1, 2, 3] contain 1', () => {
        expect([1, 2, 3]).toContain(1)
    })
    it('[1, 2, 3] not contain 4', () => {
        expect([1, 2, 3]).toNotContain(4)
    })
})