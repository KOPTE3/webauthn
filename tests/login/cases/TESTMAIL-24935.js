'use strict';

let assert = require('assert');
let page = require('../object');

describe('TESTMAIL-24935: Авторизация. Со страницы логина. Проверка отображения элементов на форме авторизации', () => {
    beforeEach(() => {
        page.open('/login');
    });

    it('Проверка активного провайдера', () => {
        assert.equal(page.activeProvider, 'mail.ru');
    });

    it('Заголовок формы', () => {
        let result = browser.getText(page.locator.header);

        assert.equal(result, 'Вход в почту');
    });

    it('Текст в форме', () => {
        let result = browser.getText(page.locator.desc);

        assert.equal(result, 'Вы можете войти в почту с помощью аккаунта любого почтового сервиса и легко переключаться между ними, не выходя из почты. Узнать больше');
    });

    it('Узнать больше (текст)', () => {
        let result = browser.getText(page.locator.forgetText);

        assert.equal(result, 'Узнать больше');
    });

    it('Узнать больше (ссылка)', () => {
        let result = browser.getAttribute(page.locator.forgetLink, 'href');

        assert.equal(result, 'https://e.mail.ru/cgi-bin/passremind');
    });

    it('Напомнить пароль (текст)', () => {
        let result = browser.getText(page.locator.remindText);

        assert.equal(result, 'запомнить почту');
    });

    it('Напомнить пароль (состояние)', () => {
        let result = browser.element(page.locator.remindState);

        assert.equal(result.getValue(), '1');
    });

    it('Список провайдеров', () => {
        let providers = browser
            .elements(page.locator.providersBlock)
            .getAttribute('data-domain');

        let result = page.providers.every((value, index) => {
            return value === providers[index];
        });

        assert(result);
    });

    // it('Иконки доменов', () => {
    //
    // });
});
