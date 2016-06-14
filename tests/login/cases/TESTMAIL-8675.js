'use strict';

let assert = require('assert');
let page = require('../object');

it('Авторизация. Со страницы логина. Выделение соответствующей иконки домена при вводе email с доменом', () => {
    page.open('/login');

    page.providers.forEach(provider => {
        browser.click(`[data-domain="${provider}"]`);

        let result = browser.getValue(page.locator.providersSelect);

        if (provider === 'other') {
            provider = 'mail.ru'
        }

        assert.equal(result, provider);
    });
});
