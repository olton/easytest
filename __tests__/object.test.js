describe(`Objects tests suite`, () => {
    it(`Object is defined`, () => {
        let obj = {}
        return expect(obj).toBeDefined()
    })
    it(`Object is equal to other object`, () => {
        let obj1 = {}
        let obj2 = {}
        return expect(obj1).toBeObject(obj2)
    })
    it(`Failed test`, () => {
        let obj1 = {a: 1}
        let obj2 = {a: 2}
        return expect(obj1).toBeObject(obj2)
    })
    it(`Deep Equal`, () => {
        let obj1 = {
            data: {
                get: "why",
                set: "ohh"
            },
            val: "test",
            prop: "hello",
            column: "test"
        }
        let obj2 = {
            data: {
                get: "why",
                set: "ohh"
            },
            val: "test",
            prop: "hello",
            column: "test"
        }
        return expect(obj1).toBeDeepEqual(obj2)
    })
})