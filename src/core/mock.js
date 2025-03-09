const mock = (fn = () => {}) => {
    const mockFn = (...args) => {
        mockFn.mock.calls.push(args)
        return fn(...args)
    }

    mockFn.mock = {
        calls: []
    }

    return mockFn
}

export default mock