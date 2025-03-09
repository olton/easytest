import { useCompose } from "@olton/hooks";

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
    it('useCompose - should compose functions correctly', () => {
        const funcA = mock((x) => x + 1);
        const funcB = mock((x) => x * 2);

        const result = useCompose(funcA, funcB)

        // Перевіряємо обчислення
        expect(result(3)).toBe(7); // (3 * 2) + 1 = 7
        expect(funcA).toHaveBeenCalledWith([6]);
        expect(funcB).toHaveBeenCalledWith([3]);
    });
})