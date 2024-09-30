describe(`Mock tests`, () => {
    it('toHaveBeenCalled', () => {
        const mock = mockFn()
        mock()
        expect(mock).toHaveBeenCalled()
    })
})