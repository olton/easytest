describe(`Mock tests`, () => {
    it('toHaveBeenCalled', () => {
        const mock = mocker()
        mock()
        expect(mock).toHaveBeenCalled()
    })
    it('toHaveBeenCalledTimes = 2', () => {
        const mock = mocker()
        mock()
        mock()
        expect(mock).toHaveBeenCalledTimes(2)
    })
    it('toHaveBeenCalledWith = 2', () => {
        const mock = mocker()
        mock(2)
        expect(mock).toHaveBeenCalledWith([2])
    })
    it('toHaveBeenLastCalledWith = 3', () => {
        const mock = mocker()
        mock(2)
        mock(3)
        expect(mock).toHaveBeenLastCalledWith([3])
    })
})