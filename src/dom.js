import { BrowserErrorCaptureEnum } from "happy-dom"
import { GlobalRegistrator } from "@happy-dom/global-registrator"
import {merge} from "./helpers/merge.js";
import { readFileSync, existsSync } from "fs"

const navigationDefaults = {
    disableMainFrameNavigation: false,
    disableChildFrameNavigation: false,
    disableChildPageNavigation: false,
    disableFallbackToSetURL: false,
    crossOriginPolicy: "no-cors",
}

const navigatorDefaults = {
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    maxTouchPoints: 5,
}

const timerDefaults = {
    maxTimeout: -1,
    maxIntervalTime: -1,
    maxIntervalIterations: -1,
}

const deviceDefaults = {
    prefersColorScheme: "light",
    mediaType: "screen",
}

const windowDefaults = {
    url: "http://localhost:8000/",
    disableJavaScriptEvaluation: false,
    disableJavaScriptFileLoading: false,
    disableCSSFileLoading: false,
    disableComputedStyleRendering: false,
    handleDisabledFileLoadingAsSuccess: false,
    errorCapture: BrowserErrorCaptureEnum.processLevel, // processLevel, tryAndCatch, disabled
    navigation: navigationDefaults,
    navigator: navigatorDefaults,
    timer: timerDefaults,
    device: deviceDefaults,
}

const setup = async (options) => {
    GlobalRegistrator.register(merge(windowDefaults, options))
    flush()
}

const bye = async () => {
    await GlobalRegistrator.unregister()
}

const html = (str) => {
    document.body.innerHTML = str
}

const flush = () => {
    document.write(`
        <html lang="en">
            <head>
                 <title>Test page</title>
            </head>
            <body>
            </body>
        </html>
    `)
}

const $ = (selector) => {
    return document.querySelector(selector)
}

const $$ = (selector) => {
    return document.querySelectorAll(selector)
}

const js = {
    fromFile: async (file) => {
        if (!existsSync(file)) {
            throw new Error(`File ${file} not found`)
        }
        const script = document.createElement('script')
        script.textContent = readFileSync(file, 'utf-8')
        document.head.appendChild(script)
    },
    fromString: async (str) => {
        const script = document.createElement('script')
        script.textContent = str
        document.head.appendChild(script)
    },
    fromUrl: async (url) => {
        const script = document.createElement('script')
        script.src = url
        document.head.appendChild(script)
    }
}

const css = {
    fromFile: async (file) => {
        if (!existsSync(file)) {
            throw new Error(`File ${file} not found`)
        }
        const style = document.createElement('style')
        style.textContent = readFileSync(file, 'utf-8')
        document.head.appendChild(style)
    },
    fromString: async (str) => {
        const style = document.createElement('style')
        style.textContent = str
        document.head.appendChild(style)
    },
    fromUrl: async (url) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        document.head.appendChild(link)
    },
    fromObject: async (obj) => {
        const _css = Object.keys(obj).map(selector => {
            const properties = Object.keys(obj[selector]).map(property => {
                return `${property}: ${obj[selector][property]}`
            }).join(';\n')
            return `${selector} {${properties}}\n`
        }).join('')
        const style = document.createElement('style')
        style.textContent = _css
        document.head.appendChild(style)
    }
}

export {
    setup,
    bye,
    html,
    js,
    css,
    $,
    $$,
    flush,

}