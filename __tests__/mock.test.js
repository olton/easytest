describe(`Mock tests`, () => {
    it('toHaveBeenCalled', () => {
        const mockFn = mock()
        mockFn()
        expect(mockFn).toHaveBeenCalled()
    })
    it('toHaveBeenCalledTimes = 2', () => {
        const mockFn = mock()
        mockFn()
        mockFn()
        expect(mockFn).toHaveBeenCalledTimes(2)
    })
    it('toHaveBeenCalledWith = 2', () => {
        const mockFn = mock()
        mockFn(2)
        expect(mockFn).toHaveBeenCalledWith([2])
    })
    it('toHaveBeenLastCalledWith = 3', () => {
        const mockFn = mock()
        mockFn(2)
        mockFn(3)
        expect(mockFn).toHaveBeenLastCalledWith([3])
    })
})