'use strict';

let assert = require('assert');
let page = require('../page');

describe('TESTMAIL-8679', () => {
    it('Авторизация. Со страницы логина. Проверка ошибки при авторизации с пустым полем пароль', () => {
        page.open('/login');

        browser.fill(page.locator.form, {Login: 'example@mail.ru'}, true)

        let result = browser.getText(page.locator.error);

        assert.equal(result, 'Поле «Пароль» должно быть заполнено.');
    });
});
