'use strict';

let assert = require('assert');
let page = require('../object');

describe('Авторизация. Со страницы логина. Проверка отображения элементов на форме авторизации', () => {
    beforeEach(() => {
        page.open('/login');
    })

    it('Проверка активного провайдера', () => {
        let result = browser
            .waitForExist('.login-page__external_domains__list_active[data-domain="mail.ru"]');

        assert(result);
    });

    it('Заголовок формы', () => {
        let result = browser
            .getText('.login-page__external_head');

        assert.equal(result, 'Вход в почту');
    });

    it('Текст в форме', () => {
        let result = browser
            .getText('.login-page__external__desc__parag');

        assert.equal(result, 'Вы можете войти в почту с помощью аккаунта любого почтового сервиса и легко переключаться между ними, не выходя из почты. Узнать больше');
    });

    it('Узнать больше (текст)', () => {
        let result = browser
            .getText('.login-page__external__desc__parag a');

        assert.equal(result, 'Узнать больше');
    });

    it('Узнать больше (ссылка)', () => {
        let result = browser
            .getAttribute('.js-login-page__external__forget a', 'href');

        assert.equal(result, 'https://e.mail.ru/cgi-bin/passremind');
    });

    it('Напомнить пароль (текст)', () => {
        let result = browser
            .getText('.login-form__remember__label');

        assert.equal(result, 'запомнить почту');
    });

    it('Напомнить пароль (состояние)', () => {
        let result = browser
            .element('.login-form__remeber__checkbox');

        assert.equal(result.getValue(), '1');
    });

    it('Список провайдеров', () => {
        let providers = browser
            .elements('.login-page__external_domains__list')
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
