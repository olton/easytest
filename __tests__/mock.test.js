describe(`Mock tests`, () => {
    it('toHaveBeenCalled', () => {
        const mock = mocker()
        mock()
        expect(mock).toHaveBeenCalled()
    })
})