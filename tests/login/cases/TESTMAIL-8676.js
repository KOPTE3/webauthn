'use strict';

let assert = require('assert');
let page = require('../object');

it('Авторизация. Со страницы логина. Отсутствие списка доменов при выборе иконки домена "Другие"', () => {
    page.open('/login');

    browser.click(page.locator.otherProvider);

    let result = browser.isVisible(page.locator.select);

    assert(!result);
});
