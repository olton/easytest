import JSDOM from 'jsdom';
import {existsSync, readFileSync} from 'fs';

const DOM_KEYS = [
    'DOMException',
    'NamedNodeMap',
    'Attr',
    'Node',
    'Element',
    'DocumentFragment',
    'HTMLDocument',
    'Document',
    'CharacterData',
    'Comment',
    'DocumentType',
    'DOMImplementation',
    'ProcessingInstruction',
    'Image',
    'Text',
    'Event',
    'CustomEvent',
    'MessageEvent',
    'ErrorEvent',
    'HashChangeEvent',
    'PopStateEvent',
    'UIEvent',
    'MouseEvent',
    'KeyboardEvent',
    'TouchEvent',
    'ProgressEvent',
    'EventTarget',
    'Location',
    'History',
    'HTMLElement',
    'HTMLAnchorElement',
    'HTMLAppletElement',
    'HTMLAreaElement',
    'HTMLAudioElement',
    'HTMLBaseElement',
    'HTMLBodyElement',
    'HTMLBRElement',
    'HTMLButtonElement',
    'HTMLCanvasElement',
    'HTMLDataElement',
    'HTMLDataListElement',
    'HTMLDialogElement',
    'HTMLDirectoryElement',
    'HTMLDivElement',
    'HTMLDListElement',
    'HTMLEmbedElement',
    'HTMLFieldSetElement',
    'HTMLFontElement',
    'HTMLFormElement',
    'HTMLFrameElement',
    'HTMLFrameSetElement',
    'HTMLHeadingElement',
    'HTMLHeadElement',
    'HTMLHRElement',
    'HTMLHtmlElement',
    'HTMLIFrameElement',
    'HTMLImageElement',
    'HTMLInputElement',
    'HTMLLabelElement',
    'HTMLLegendElement',
    'HTMLLIElement',
    'HTMLLinkElement',
    'HTMLMapElement',
    'HTMLMediaElement',
    'HTMLMenuElement',
    'HTMLMetaElement',
    'HTMLMeterElement',
    'HTMLModElement',
    'HTMLObjectElement',
    'HTMLOListElement',
    'HTMLOptGroupElement',
    'HTMLOptionElement',
    'HTMLOutputElement',
    'HTMLParagraphElement',
    'HTMLParamElement',
    'HTMLPreElement',
    'HTMLProgressElement',
    'HTMLQuoteElement',
    'HTMLScriptElement',
    'HTMLSelectElement',
    'HTMLSourceElement',
    'HTMLSpanElement',
    'HTMLStyleElement',
    'HTMLTableCaptionElement',
    'HTMLTableCellElement',
    'HTMLTableColElement',
    'HTMLTableDataCellElement',
    'HTMLTableElement',
    'HTMLTableHeaderCellElement',
    'HTMLTimeElement',
    'HTMLTitleElement',
    'HTMLTableRowElement',
    'HTMLTableSectionElement',
    'HTMLTemplateElement',
    'HTMLTextAreaElement',
    'HTMLTrackElement',
    'HTMLUListElement',
    'HTMLUnknownElement',
    'HTMLVideoElement',
    'StyleSheet',
    'MediaList',
    'CSSStyleSheet',
    'CSSRule',
    'CSSStyleRule',
    'CSSMediaRule',
    'CSSImportRule',
    'CSSStyleDeclaration',
    'StyleSheetList',
    'XPathException',
    'XPathExpression',
    'XPathResult',
    'XPathEvaluator',
    'HTMLCollection',
    'NodeFilter',
    'NodeIterator',
    'NodeList',
    'Blob',
    'File',
    'FileList',
    'FormData',
    'XMLHttpRequest',
    'XMLHttpRequestEventTarget',
    'XMLHttpRequestUpload',
    'DOMTokenList',
    'URL'
]

const OTHER_KEYS = [
    'addEventListener',
    'alert',
    'atob',
    'blur',
    'btoa',
    'close',
    'confirm',
    'createPopup',
    'dispatchEvent',
    'document',
    'focus',
    'frames',
    'getComputedStyle',
    'history',
    'innerHeight',
    'innerWidth',
    'length',
    'location',
    'moveBy',
    'moveTo',
    'name',
    'open',
    'outerHeight',
    'outerWidth',
    'pageXOffset',
    'pageYOffset',
    'parent',
    'postMessage',
    'print',
    'prompt',
    'removeEventListener',
    'resizeBy',
    'resizeTo',
    'screen',
    'screenLeft',
    'screenTop',
    'screenX',
    'screenY',
    'scroll',
    'scrollBy',
    'scrollLeft',
    'scrollTo',
    'scrollTop',
    'scrollX',
    'scrollY',
    'self',
    'stop',
    'toString',
    'top',
    'window'
]

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

export function setup(html = defaultHtml, options = {}) {
    const jsdom = new JSDOM.JSDOM(html, {...defaultDomOptions, ...options})

    const {window} = jsdom
    const {document} = window

    const keys = DOM_KEYS.concat(OTHER_KEYS)

    keys.forEach(function (key) {
        global[key] = window[key]
    })

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
    const keys = DOM_KEYS.concat(OTHER_KEYS)

    keys.forEach(function (key) {
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

