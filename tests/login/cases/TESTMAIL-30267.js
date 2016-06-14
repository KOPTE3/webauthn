'use strict';

let assert = require('assert');
let page = require('../object');

it('Страница логина. Отображение ошибки errno=10', () => {
    page.open('/login?errno=10');

    let active = browser.getText('.login-page__external_error');

    assert(active, 'Ошибка! Повторите попытку через некоторое время.');
});
