import puppeteer, {KnownDevices} from 'puppeteer';

const defaultBrowserOptions = {
    headless: "shell",
    args: [
        '--no-sandbox',
    ],
    log: false,
}

export class Browser {
    static browser = null;
    static page = null;
    static error = null;
    static options = null

    static async create(options = defaultBrowserOptions){
        this.options = {...defaultBrowserOptions, ...options}
        this.browser = await puppeteer.launch(this.options);
        this.page = await this.browser.newPage();
        this.page.on('error', msg => {
            this.error = msg
            if (this.options.log) console.log(`[ERROR] - ${msg}`)
        })
        this.page.on('pageerror', msg => {
            this.error = msg
            if (this.options.log) console.log(`[PAGE-ERROR] - ${msg}`)
        })
        this.page.on('console', msg => {
            for (let i = 0; i < msg.args.length; ++i) {
                if (this.options.log) console.log(`${i}: ${msg.args[i]}`)
            }
        })
        this.page.on('requestfailed', request => {
            this.error = request.failure().errorText
            if (this.options.log) console.log('Request failed: ', request.failure().errorText);
        })
        this.page.on('response', response => {
            if (this.options.log) console.log('Response status: ', response.status());
        });
    }

    static async bye(){
        await this.browser.close();
    }

    static async visit(url, options){
        this.error = null
        await this.page.goto(url, options);
    }

    static async $$(selector){
        return await this.page.$$(selector);
    }

    static async $(selector){
        return await this.page.$(selector);
    }

    static document = {
        title: async () => await this.page.title(),
        url: async () => await this.page.url(),
        html: async () => await this.page.content(),
        cookies: async (...urls) => await this.page.cookies(...urls),
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

    static emulate = async (device) => {
        await this.page.emulate(device)
    }

    static devices = KnownDevices
}