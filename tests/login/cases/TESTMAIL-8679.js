'use strict';

let assert = require('assert');
let page = require('../object');

it('Авторизация. Со страницы логина. Проверка ошибки при авторизации с пустым полем пароль', () => {
    page.open('/login');

    browser.setValue('.login-page__external_input__login', 'example@mail.ru');
    browser.click('.js-login-page__external__submit');

    let result = browser.getText('.login-page__external_error');

    assert.equal(result, 'Поле «Пароль» должно быть заполнено.');
});
