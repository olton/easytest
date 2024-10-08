import puppeteer from 'puppeteer';

const defaultPageOptions = {
    viewport: {
        width: 1920,
        height: 1080
    },
}

export class Browser {
    static browser = null;
    static page = null;

    static async create(){
        this.browser = await puppeteer.launch({headless: 'shell'});
        this.page = await this.browser.newPage();
    }

    static async close(){
        await this.browser.close();
    }

    static async visit(url, options = defaultPageOptions){
        await this.page.goto(url);
        if (options.viewport) {
            await this.page.setViewport({...options.viewport});
        }
    }

    static async $$(selector){
        return await this.page.$$(selector);
    }

    static async $(selector){
        return await this.page.$(selector);
    }

    static document = {
        title: async () => {
            return await this.page.title();
        },
    }

    static window = async (v) => {
        return await this.page.evaluate((v) => window[v], v)
    }

    static click = async (selector) => {
        const element = await this.page.$(selector)
        element.click()
    }

    static screenshot = async (path) => {
        await this.page.screenshot({path})
    }
}