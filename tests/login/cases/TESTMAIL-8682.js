'use strict';

let assert = require('assert');
let page = require('../object');

it('Авторизация. Со страницы логина. Выделение соответствующей иконки домена при вводе email с доменом', () => {
    page.open('/login');

    page.providers.forEach(provider => {
        browser.fill(page.locator.form, {
            Login: `example@${provider}`
        });

        assert.equal(page.activeProvider, provider);
    });
});
