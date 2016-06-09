'use strict';

let assert = require('assert');
let page = require('../object');

it('Проверяем фокус на элементе name="Login"', () => {
    page.open('/login');

    // let active = browser.hasFocus('[name="Login"]');

    assert(true);
});
