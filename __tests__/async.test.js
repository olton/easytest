async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 1000);
    });
}

describe('Async function tests', () => {
    it('should return data after 1 second', async () => {
        const data = await fetchData();
        console.log("Async test");
        expect(data).toBe("Data received1");
    });
});

test('should return data after 1 second', async () => {
    const data = await fetchData();
    console.log("Async test");
    expect(data).toBe("Data received1");
});
