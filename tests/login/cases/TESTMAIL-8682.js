'use strict';

let assert = require('assert');
let page = require('../object');

// TODO: Переписать — other и async

it('Авторизация. Со страницы логина. Выделение соответствующей иконки домена при вводе email с доменом', () => {
    page.open('/login');

    page.providers.forEach(provider => {
        browser.setValue('.js-login-page__external__input_login', 
            `example@${provider}`);

        let result = browser
            .waitForExist(`.login-page__external_domains__list_active[data-domain="${provider}"]`);

        assert(result);
    });
});
