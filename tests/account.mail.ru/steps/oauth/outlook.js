'use strict';

let assert = require('assert');

let OauthSteps = require('../../steps/oauth');
let OutlookPage = require('../../pages/oauth/outlook');

let oauthSteps = new OauthSteps();

/** Модуль для работы с шагами сервиса outlook.com */
class OutlookSteps extends OauthSteps {
	constructor () {
		super();

		this.outlookPage = new OutlookPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new OutlookPage();
	}

	/**
	 *
	 * Нажатие на кнопку next
	 */
	clickNextBtn () {
		this.outlookPage.clickNextBtn();
	}

	/**
	 * Клик по кнопке авторизации
	 */
	clickSignInBtn () {
		this.outlookPage.clickSignInBtn();
	}

	/**
	 * Вводим пароль
	 * а до этого дожидаемся появления поля инпут
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		this.outlookPage.waitPassowrd();
		this.outlookPage.setPassword(password);
	}
}

module.exports = OutlookSteps;
