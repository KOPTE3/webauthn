'use strict';

let LoginPage = require('../login');

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
			select         : '.b-select__dropdown',
			login          : '[name="Username"]',
			form           : '[data-bem="b-form"]',
			password       : '[name="Password"]',
			submit         : '[data-name="submit"]:first-child',
			error          : '.b-login__errors',
			title          : '.b-login__header__title',
			desc           : '.b-login__header__desc',
			rememberState  : '.b-grid_restore [name="saveauth"]',
			rememberText   : '.b-grid_restore .b-checkbox__label',
			forgetLink     : '.b-link_passremind',
			signUpLink     : '[data-name="signup-link"]',
			providers      : {
				other      : '[data-id="other"]'
			}
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
	 * Проверить переход по ссылке восстановления пароля
	 *
	 * @param {string} url
	 * @returns {boolean}
	 */
	clickPassRemindLink (url) {
		this.page.click(this.locators.forgetLink);

		return this.page.waitForUrl(url);
	}

	/**
	 * Проверить переход по ссылке регистрации
	 *
	 * @param {string} url
	 * @returns {boolean}
	 */
	clickSignUpLink (url) {
		this.page.click(this.locators.signUpLink);

		return this.page.waitForUrl(url);
	}

	/**
	 * Получить активный домен
	 *
	 * @param {string} provider
	 */
	clickByDomain (provider) {
		this.page.click(this.locators.providers[provider]);
	}

	/**
	 * Отправить форму по клику
	 *
	 * @returns {Promise}
	 */
	clickBySignInButton () {
		return this.page.click(this.locators.submit);
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
	 * Заполнить поле логина
	 *
	 * @param {string} login
	 * @returns {Promise}
	 */
	setLogin (login) {
		return this.page.setValue(this.locators.login, login);
	}

	/**
	 * Заполнить поле пароля
	 *
	 * @param {string} password
	 * @returns {Promise}
	 */
	setPassword (password) {
		return this.page.setValue(this.locators.password, password);
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
	 * Проверить видимость кнопки восстановления пароля
	 *
	 * @returns {boolean}
	 */
	isPassRemindLinkExist () {
		return this.page.isExisting(this.locators.forgetLink);
	}

	/**
	 * Прикинуться мобильным пользователем
	 * Это требуется для пропуска формы дорегистрации
	 */
	meetMeAsMobileUser () {
		for (let field of ['mp', 'mmp']) {
			this.page.addHiddenValue(this.locators.form, field, 1);
		}
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
