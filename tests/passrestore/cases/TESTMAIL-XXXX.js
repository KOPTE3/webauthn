'use strict';

const page = require('../object');
const assert = require('assert');

describe('Passremind. Форма ввода адреса', () => {
    page.open('/password/restore');

    it('Корректный заголовок', () => {
        assert.equal(browser.getText(page.accountView.title), 'Восстановление пароля');
    });

    it('Пустая форма не отправляется', () => {
        browser.setValue(page.accountView.input, '');
        browser.click(page.accountView.btn);

        assert.equal(browser.getText(page.accountView.error), 'Введите почтовый ящик');
    });
});
