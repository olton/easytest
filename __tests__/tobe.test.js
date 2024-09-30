describe(`toBe tests`, () => {
    it('toBe', () => {
        expect(1).toBe(1)
    })
    it('toBeNot', () => {
        expect(1).toBeNot(2)
    })
    it('toBeStrictEqual', () => {
        expect("123").toBeStrictEqual("123")
    })
    it('toBeNotStrictEqual', () => {
        expect("123").toBeNotStrictEqual(123)
    })
    it('toBeEqual', () => {
        expect("123").toBeEqual(123)
    })
    it('toBeNotEqual', () => {
        expect("123").toBeNotEqual(124)
    })
})