'use strict';

let assert = require('assert');
let PageObject = require('../../pages');

class Login extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container      : '#LoginExternal',
			providersSelect: '.js-login-page__external__input_domain',
			providersBlock : '.login-page__external_domains__list',
			activeDomain   : '.login-page__external_domains__list_active',
			otherProvider  : '.login-page__external_domains__item_other',
			select         : '.login-page__external_select__box',
			login          : '.login-page__external_input__login',
			submit         : '.js-login-page__external__submit',
			error          : '.login-page__external_error',
			header         : '.login-page__external_head',
			rememberState  : '.login-form__remeber__checkbox',
			rememberText   : '.login-form__remember__label',
			forgetLink     : '.js-login-page__external__forget a',
			helpLink       : '.login-page__external__desc__parag a',
			helpText       : '.login-page__external__desc__parag a',
			desc           : '.login-page__external__desc__parag'
		}
	}

	/**
	 * Получить активный домен
	 *
	 * @property
	 * @returns {string}
	 */
	get activeDomain () {
		return browser.getAttribute(this.locators.activeDomain, 'data-domain');
	}

	/**
	 * Получить активный домен
	 *
	 * @param {string} provider
	 * @returns {Promise}
	 */
	clickByDomain () {
		return browser.click(`[data-domain="${provider}"]`);
	}

	/**
	 * Получить состояние видимости списка доменов
	 *
	 * @property
	 * @returns {string}
	 */
	get isSelectVisible () {
		return browser.isVisible(this.locators.select);
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @property
	 * @returns {string}
	 */
	get getError () {
		return browser.getText(this.locators.error);
	}

	/**
	 * Получить адрес ссылки для восстановления пароля
	 *
	 * @property
	 * @returns {string}
	 */
	get getPassRemindLink () {
		return browser.getAttribute(this.locators.forgetLink, 'href');
	}

	/**
	 * Получить адрес ссылки на страницу помощи
	 *
	 * @property
	 * @returns {string}
	 */
	get getHelpLink () {
		return browser.getAttribute(this.locators.helpLink, 'href');
	}

	/**
	 * Получить текст ссылки "Узнать больше"
	 *
	 * @property
	 * @returns {string}
	 */
	get getHelpText () {
		return browser.getText(this.locators.helpText);
	}

	/**
	 * Получить текст контрола "Запомнить почту"
	 *
	 * @property
	 * @returns {string}
	 */
	get getRememberText () {
		return browser.getText(page.locator.rememberText);
	}

	/**
	 * Получить состояние контрола "Запомнить почту"
	 *
	 * @property
	 * @returns {string}
	 */
	get getRememberState () {
		let state = browser.element(this.locators.rememberState);

		return state.getValue();
	}

	/**
	 * Получить заголовок формы
	 *
	 * @property
	 * @returns {string}
	 */
	get title () {
		return browser.getText(this.locators.header);
	}

	/**
	 * Получить описание формы
	 *
	 * @property
	 * @returns {string}
	 */
	get description () {
		return browser.getText(this.locators.desc);
	}

	/**
	 * Заполнить форму с заданными полями
	 *
	 * @param {Object}
	 * @returns {Promise}
	 */
	fill () {
		return browser.fill(this.locators.container);
	}

	/**
	 * Отправить форму
	 *
	 * @param {Object} data
	 * @returns {Promise}
	 */
	send (data) {
		return browser.fill(page.locators.container, data, true);
	}

	/**
	 * Получить значение из списка доменов
	 *
	 * @property
	 * @returns {string}
	 */
	get getLoginValue () {
		return browser.getValue(this.locators.providersSelect);
	}

	/**
	 * Получить значение из списка доменов
	 *
	 * @param {string} provider
	 * @returns {Promise}
	 */
	getSelectedDomain (provider) {
		return browser.selectByValue(this.locators.providersSelect, provider);
	}
}

module.exports = new Login();
