'use strict';

let assert = require('assert');

let OauthSteps = require('../../steps/oauth');
let FbPage = require('../../pages/oauth/fb');

let oauthSteps = new OauthSteps();

/** Модуль для работы с шагами сервиса fb.com */
class FbSteps extends OauthSteps {
	constructor () {
		super();

		this.fbPage = new FbPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new FbPage();
	}

	/**
	 * Клик по кнопке авторизации
	 */
	clickSignInBtn () {
		this.fbPage.clickSignInBtn();
	}

	/**
	 * Вписываем логин
	 *
	 * @param {string} login
	 */
	setLogin (login) {
		this.fbPage.waitElem(this.fbPage.locators.login);
		this.fbPage.setValue(login, this.fbPage.locators.login);
	}

	/**
	 * Вводим пароль
	 * а до этого дожидаемся появления поля инпут
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		this.fbPage.waitElem(this.fbPage.locators.password);
		this.fbPage.setValue(password, this.fbPage.locators.password);
	}
}

module.exports = FbSteps;
