'use strict';

let assert = require('assert');

let OAuthSteps = require('../../steps/oauth');
let GmailPage = require('../../pages/oauth/gmail');

let oauthSteps = new OAuthSteps();

/** Модуль для работы с шагами сервиса gmail.com */
class GmailSteps extends OAuthSteps {
	constructor () {
		super();

		this.gmailPage = new GmailPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new GmailPage();
	}

	/**
	 *
	 * Нажатие на кнопку next
	 */
	clickNextBtn () {
		this.gmailPage.clickNextBtn();
	}

	/**
	 * Клик по кнопке авторизации
	 */
	clickSignInBtn () {
		this.gmailPage.clickSignInBtn();
	}

	/**
	 * Вводим пароль
	 * а до этого дожидаемся появления поля инпут
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		this.gmailPage.waitPassword();
		this.gmailPage.setPassword(password);
	}
}

module.exports = GmailSteps;
