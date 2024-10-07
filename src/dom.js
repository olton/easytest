import JSDOM from 'jsdom';
import {existsSync, readFileSync} from 'fs';

const defaultHtml = `
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body></body>
    </html>
`

const defaultDomOptions = {
    runScripts: "dangerously",
    resources: "usable",
    url: "http://localhost",
    pretendToBeVisual: true,
}

const DOM_KEYS = []

export function setup(html = defaultHtml, options = {}) {
    if (global.$jsdom) {
        clean()
    }

    const jsdom = new JSDOM.JSDOM(html, {...defaultDomOptions, ...options})

    const {window} = jsdom
    const {document} = window

    for(const key of Object.getOwnPropertyNames(window)) {
        try {
            if (typeof global[key] === 'undefined') {
                global[key] = window[key]
                DOM_KEYS.push(key)
            }
        } catch {}
    }

    global.window = window
    global.document = document
    window.console = global.console

    global.$jsdom = jsdom

    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false, addListener: function () {
            }, removeListener: function () {
            }
        };
    }
    window.onerror = (msg = '') => {
        throw new Error(msg);
    }
}

export function clean() {
    DOM_KEYS.forEach(function (key) {
        delete global[key]
    })

    delete global.window
    delete global.document
    delete global.$jsdom
}

export const css = {
    fromString: (path) => {
        if (typeof path === 'string') {
            const style = document.createElement('style');
            style.textContent = path;
            document.head.appendChild(style);
        } else {
            throw new Error('CSS must be a string');
        }
    },
    fromFile: (path) => {
        if (existsSync(path)) {
            const style = document.createElement('style');
            style.textContent = readFileSync(path, 'utf8');
            document.head.appendChild(style);
        }
    },
    fromUrl: (path) => {
        if (typeof path === 'string') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = path;
            document.head.appendChild(link);
        } else {
            throw new Error('Path must be a string');
        }
    },
}

export const js = {
    fromString: (path) => {
        if (typeof path === 'string') {
            const script = document.createElement('script');
            script.textContent = path;
            document.body.appendChild(script);
        } else {
            throw new Error('JavaScript must be a string');
        }
    },
    fromFile: (path) => {
        if (existsSync(path)) {
            const script = document.createElement('script');
            script.textContent = readFileSync(path, 'utf8');
            document.body.appendChild(script);
        }
    },
    fromUrl: (path) => {
        if (typeof path === 'string') {
            const script = document.createElement('script');
            script.src = path;
            document.body.appendChild(script);
        } else {
            throw new Error('Path must be a string');
        }
    },
}

export const evalJS = (js) => {
    if (typeof js === 'string') {
        window.eval(js);
    } else {
        throw new Error('JavaScript must be a string');
    }
}

export const html = {
    fromString: (html) => {
        if (typeof html === 'string') {
            document.body.innerHTML = html;
        } else {
            throw new Error('HTML must be a string');
        }
    },
    fromFile: (path) => {
        if (existsSync(path)) {
            document.body.innerHTML = readFileSync(path, 'utf8');
        }
    },
    fromUrl: (path) => {
        if (typeof path === 'string') {
            fetch(path).then(response => response.text()).then(html => {
                document.body.innerHTML = html;
            });
        } else {
            throw new Error('Path must be a string');
        }
    },
}

/**
 * Flash the document HTML inner.
 */
export const flash = (html = defaultHtml) => {
    document.body.innerHTML = html;
}

