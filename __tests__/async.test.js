async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 1000);
    });
}

describe('Async function tests', async () => {
    it('should return data after 1 second', async () => {
        const data = await fetchData();
        return expect(data).toBe("Data received");
    });
});

test('should return data after 1 second', async () => {
    const data = await fetchData();
    return expect(data).toBe("Data received");
});
