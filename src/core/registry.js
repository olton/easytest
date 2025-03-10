import { expect as expectFn } from '../expects/expect.js';
import mockFn from "./mock.js";
import { Browser } from "../browser/browser.js";
import { setup as setupDom, bye as byeDom, js, css, html } from "../dom/index.js";
import { delay, getFileUrl } from "../helpers/delay.js";
import { describe, it, test } from "./api.js";
import { beforeEach, afterEach, beforeAll, afterAll } from "./hooks.js";

export const DOM = {
    setup: setupDom,
    bye: byeDom,
    js,
    css,
    html,
};

export function registerGlobals() {
    // Регистрация API
    global.describe = describe;
    global.it = it;
    global.test = test;
    global.expect = expectFn;
    global.afterEach = afterEach;
    global.beforeEach = beforeEach;
    global.beforeAll = beforeAll;
    global.afterAll = afterAll;
    global.mock = mockFn;
    global.delay = delay;
    global.getFileUrl = getFileUrl;
    global.DOM = DOM;
    global.B = Browser;
}

// Экспортируем все публичные функции и объекты
export const expect = expectFn;
export const mock = mockFn;
export const B = Browser;

export { describe, it, test, beforeEach, afterEach, beforeAll, afterAll, delay, getFileUrl };