'use strict';

let PageObject = require('../../pages');
let providers = require('../../store/collectors/providers');

/** Модуль для работы с формой страницы логина */
class Form extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
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
	 * @returns {string}
	 */
	getActiveDomain () {
		return this.page.getAttribute(this.locators.activeDomain, 'data-domain');
	}

	/**
	 * Получить активный домен
	 *
	 * @param {string} provider
	 * @returns {Promise}
	 */
	clickByDomain (provider) {
		return this.page.click(`[data-domain="${provider}"]`);
	}

	/**
	 * Получить состояние видимости списка доменов
	 *
	 * @returns {string}
	 */
	isSelectVisible () {
		return this.page.isVisible(this.locators.select);
	}

	/**
	 * Получить состояние видимости списка доменов
	 *
	 * @param {string} login
	 * @returns {Promise}
	 */
	setLogin (login) {
		return this.page.setValue(this.locators.login, login);
	}

	/**
	 * Получить сообщение об ошибке
	 *
	 * @returns {string}
	 */
	getError () {
		return this.page.getText(this.locators.error);
	}

	/**
	 * Получить домен, который используется по умолчанию
	 *
	 * @returns {string}
	 */
	getDefaultDomain () {
		return this.page
			.elements(this.locators.providersBlock)
			.getAttribute('data-domain');
	}

	/**
	 * Получить адрес ссылки для восстановления пароля
	 *
	 * @returns {boolean}
	 */
	getPassRemindLink () {
		return this.page.getAttribute(this.locators.forgetLink, 'href');
	}

	/**
	 * Получить адрес ссылки на страницу помощи
	 *
	 * @returns {boolean}
	 */
	getHelpLink () {
		return this.page.getAttribute(this.locators.helpLink, 'href');
	}

	/**
	 * Получить текст ссылки "Узнать больше"
	 *
	 * @returns {boolean}
	 */
	getHelpText () {
		return this.page.getText(this.locators.helpText);
	}

	/**
	 * Получить текст контрола "Запомнить почту"
	 *
	 * @returns {boolean}
	 */
	getRememberText () {
		return this.page.getText(this.locators.rememberText);
	}

	/**
	 * Получить состояние контрола "Запомнить почту"
	 *
	 * @returns {boolean}
	 */
	getRememberState () {
		let state = this.page.element(this.locators.rememberState);

		return state.getValue();
	}

	/**
	 * Получить заголовок формы
	 *
	 * @type {string}
	 */
	get title () {
		return this.page.getText(this.locators.header);
	}

	/**
	 * Получить описание формы
	 *
	 * @type {string}
	 */
	get description () {
		return this.page.getText(this.locators.desc);
	}

	/**
	 * Отправить форму
	 *
	 * @param {Object} data
	 * @returns {Promise}
	 */
	send (data) {
		return this.page.fill(this.locators.container, data, true);
	}

	/**
	 * Получить значение из списка доменов
	 *
	 * @type {string}
	 */
	get getLoginValue () {
		return this.page.getValue(this.locators.providersSelect);
	}

	/**
	 * Получить значение из списка доменов
	 *
	 * @param {string} provider
	 * @returns {Promise}
	 */
	getSelectedDomain (provider) {
		return this.page.selectByValue(this.locators.providersSelect, provider);
	}
}

module.exports = new Form();
