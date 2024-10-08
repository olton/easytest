import { browser } from '../src/index.js'

const url = 'http://example.com/'

beforeAll(async () => {
    await browser.create()
})

afterAll(async () => {
    await browser.close()
})

describe(`Browser tests`, () => {
    it(`Visit example.com`, async () => {
        await browser.visit(url)
        const title = await browser.document.title()
        expect(title).toContain('Example Domain', 'Title test failed')
    })
    it(`Visit metroui.org.ua`, async () => {
        await browser.visit(`https://metroui.org.ua`)
        const metro = await browser.window('Metro')
        expect(metro).toBeDefined('Metro is undefined')
    })
    it(`Visit metroui.org.ua`, async () => {
        await browser.visit(`https://metroui.org.ua`)
        const window = await browser.window('location')
        expect(window).toBeDefined('Window is undefined')
    })
})