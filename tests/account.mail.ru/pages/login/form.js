'use strict';

let LoginPage = require('../login');
let providers = require('../../store/authorization/providers');

/** Модуль для работы с формой страницы логина */
class LoginForm extends LoginPage {
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
			container      : '.b-login',
			providersSelect: '.b-dropdown__list',
			providersBlock : '.b-email-providers__list',
			activeDomain   : '.b-email-providers__list__item_selected',
			otherProvider  : '[data-id="other"]',
			select         : '.b-select__dropdown',
			login          : '[data-input="Login"] [name="Username"]',
			password       : '[data-input="Password"] [name="Password"]',
			submit         : '.js-login-page__external__submit',
			error          : '.b-login__errors',
			title          : '.b-login__header__title',
			desc           : '.b-login__header__desc',
			rememberState  : '.b-grid_restore [name="saveauth"]',
			rememberText   : '.b-grid_restore .b-checkbox__label',
			forgetLink     : '.b-link_passremind'
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
	 * Проверить активный элемент
	 *
	 * @returns {boolean}
	 */
	checkActiveElement () {
		return this.page.hasFocus(this.locators.login);
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
	 * @returns {boolean}
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
	 * Кликнуть на ссылку восстановления пароля
	 */
	clickPassRemindLink () {
		this.page.click(this.locators.forgetLink);
	}

	/**
	 * Проверить ссылку восстановления пароля
	 *
	 * @param {string} url
	 */
	checkPassRemindLink (url) {
		this.clickPassRemindLink();
		this.page.wait(url);
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
	getSessionState () {
		return this.page.isEnabled(this.locators.rememberState);
	}

	/**
	 * Получить заголовок формы
	 *
	 * @type {string}
	 */
	get title () {
		return this.page.getText(this.locators.title);
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
	 */
	getLoginValue () {

	}

	/**
	 * Получить значение из списка доменов
	 *
	 * @param {string} provider
	 */
	getSelectedDomain (provider) {

	}
}

module.exports = LoginForm;
