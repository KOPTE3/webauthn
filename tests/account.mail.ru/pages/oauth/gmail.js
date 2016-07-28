'use strict';

let OauthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса gmail.com */
class GmailPage extends OauthPage {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return 'https://accounts.google.com/';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.card.signin-card';

		return {
			container,
			nextBtn: `${container} .rc-button.rc-button-submit`,
			password: `${container} #Passwd[name=Passwd]`,
			signIn: `${container} #signIn`
		};
	}

	/**
	 * Клик по кнопке Продолжить
	 *
	 * @returns {*}
	 */
	clickNextBtn () {
		return this.page.click(this.locators.nextBtn);
	}

	/**
	 * Клик по кнопке "Войти"
	 *
	 * @returns {*}
	 */
	clickSignInBtn () {
		return this.page.click(this.locators.signIn);
	}

	/**
	 * Заполнить поле пароля
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		this.page.setValue(this.locators.password, password);
	}

	/**
	 * Ожидаем пока пароль будет виден
	 */
	waitPassword () {
		this.page.waitForVisible(this.locators.password);
	}

}

module.exports = GmailPage;
