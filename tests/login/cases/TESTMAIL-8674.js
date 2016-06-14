'use strict';

let assert = require('assert');
let page = require('../object');

it('Авторизация. Со страницы логина. Проверка отображения элементов на форме авторизации', () => {
    page.open('/login');

    page.providers.forEach(provider => {
        if (provider !== 'other') {
            browser.selectByValue(page.locator.providersSelect, provider);

            assert.equal(page.activeProvider, provider);
        }
    });
});
