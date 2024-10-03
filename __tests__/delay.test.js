test(`Delay function`, async () => {
    for (let i = 0; i < 5; i++) {
        console.log(`Iteration: ${i}`)
        await delay(1000)
    }
})