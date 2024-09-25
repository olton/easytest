describe(`Objects tests suite`, () => {
    it(`Object is defined`, () => {
        let obj = {}
        expect(obj).toBeDefined()
    })
    it(`Object is equal to other object`, () => {
        let obj1 = {}
        let obj2 = {}
        expect(obj1).toBeObjectEqual(obj2)
    })
    it(`Failed test`, () => {
        let obj1 = {a: 1}
        let obj2 = {b: 2}
        expect(obj1).toBeObjectEqual(obj2)
    })
})