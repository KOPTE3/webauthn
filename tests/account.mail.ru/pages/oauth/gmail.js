'use strict';

let OAuthPage = require('../../pages/oauth');

/** Модуль для работы с представлением сервиса gmail.com */
class GmailPage extends OAuthPage {
	constructor () {
		super();
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
