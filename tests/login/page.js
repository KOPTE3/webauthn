'use strict';

let PageObject = require('../page');

class Page extends PageObject {
    constructor () {
        super();
    }

    get locator () {
        return {
            providersSelect: '.js-login-page__external__input_domain',
            providersBlock : '.login-page__external_domains__list',
            activeProvider : '.login-page__external_domains__list_active',
            otherProvider  : '.login-page__external_domains__item_other',
            select         : '.login-page__external_select__box',
            login          : '.login-page__external_input__login',
            submit         : '.js-login-page__external__submit',
            error          : '.login-page__external_error',
            form           : '#LoginExternal',
            header         : '.login-page__external_head',
            remindState    : '.login-form__remeber__checkbox',
            remindText     : '.login-form__remember__label',
            forgetLink     : '.js-login-page__external__forget a',
            forgetText     : '.login-page__external__desc__parag a',
            desc           : '.login-page__external__desc__parag'
        }
    }

    get providers () {
        return [
            'mail.ru',
            'yandex.ru',
            'rambler.ru',
            'gmail.com',
            'other'
        ];
    }

    get activeProvider () {
        return browser.getAttribute(this.locator.activeProvider, 'data-domain');
    }
}

module.exports = new Page();
