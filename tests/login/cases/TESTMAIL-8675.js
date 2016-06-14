'use strict';

let assert = require('assert');
let page = require('../object');

// TODO: Пока непонято на что кликать

it('Авторизация. Со страницы логина. Выделение соответствующей иконки домена при вводе email с доменом', () => {
    page.open('/login');
});
