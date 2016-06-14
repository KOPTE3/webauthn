'use strict';

let assert = require('assert');
let page = require('../object');

it('Авторизация. Со страницы логина. Отсутствие списка доменов при выборе иконки домена "Другие"', () => {
    page.open('/login');

    browser.click('.login-page__external_domains__item_other');

    let result = browser.isVisible('.login-page__external_select__box');

    assert(!result);
});
