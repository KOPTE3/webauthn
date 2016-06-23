'use strict';

let assert = require('assert');
let PageObject = require('../../pages');
let providers = require('../../store/collectors/providers');

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
			login          : '.login-page__external_input__login[name="Login"]',
			submit         : '.js-login-page__external__submit',
			error          : '.login-page__external_error',
			header         : '.login-page__external_head',
			rememberState  : '.login-form__remeber__checkbox',
			rememberText   : '.login-form__remember__label',
			forgetLink     : '.js-login-page__external__forget a',
			helpLink       : '.login-page__external__desc__parag a',
			helpText       : '.login-page__external__desc__parag a',
			desc           : '.login-page__external__desc__parag'
		};
	}

	/**
	 * Получить активный домен
	 *
	 * @type {string}
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
	clickByDomain (provider) {
		return browser.click(`[data-domain="${provider}"]`);
	}

	/**
	 * Получить состояние видимости списка доменов
	 *
	 * @type {string}
	 */
	get isSelectVisible () {
		return browser.isVisible(this.locators.select);
	}

	/**
	 * Получить состояние видимости списка доменов
	 *
	 * @param {string} login
	 * @returns {Promise}
	 */
	setLogin (login) {
		return browser.setValue(this.locators.login, login);
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @type {string}
	 */
	get getError () {
		return browser.getText(this.locators.error);
	}

	/**
	 * Получить домен, который используется по умолчанию
	 *
	 * @type {string}
	 */
	get getDefaultDomain () {
		return browser
			.elements(this.locators.providersBlock)
			.getAttribute('data-domain');
	}

	/**
	 * Получить адрес ссылки для восстановления пароля
	 *
	 * @type {string}
	 */
	get getPassRemindLink () {
		return browser.getAttribute(this.locators.forgetLink, 'href');
	}

	/**
	 * Получить адрес ссылки на страницу помощи
	 *
	 * @type {string}
	 */
	get getHelpLink () {
		return browser.getAttribute(this.locators.helpLink, 'href');
	}

	/**
	 * Получить текст ссылки "Узнать больше"
	 *
	 * @type {string}
	 */
	get getHelpText () {
		return browser.getText(this.locators.helpText);
	}

	/**
	 * Получить текст контрола "Запомнить почту"
	 *
	 * @type {string}
	 */
	get getRememberText () {
		return browser.getText(this.locators.rememberText);
	}

	/**
	 * Получить состояние контрола "Запомнить почту"
	 *
	 * @type {string}
	 */
	get getRememberState () {
		let state = browser.element(this.locators.rememberState);

		return state.getValue();
	}

	/**
	 * Получить заголовок формы
	 *
	 * @type {string}
	 */
	get title () {
		return browser.getText(this.locators.header);
	}

	/**
	 * Получить описание формы
	 *
	 * @type {string}
	 */
	get description () {
		return browser.getText(this.locators.desc);
	}

	/**
	 * Отправить форму
	 *
	 * @param {Object} data
	 * @returns {Promise}
	 */
	send (data) {
		return browser.fill(this.locators.container, data, true);
	}

	/**
	 * Получить значение из списка доменов
	 *
	 * @type {string}
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
