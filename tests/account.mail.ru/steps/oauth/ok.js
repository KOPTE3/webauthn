'use strict';

let assert = require('assert');

let OauthSteps = require('../../steps/oauth');
let OkPage = require('../../pages/oauth/ok');

let oauthSteps = new OauthSteps();

/** Модуль для работы с шагами сервиса ok.com */
class OkSteps extends OauthSteps {
	constructor () {
		super();

		this.okPage = new OkPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new OkPage();
	}

	/**
	 * Клик по кнопке авторизации
	 */
	clickSignInBtn () {
		this.okPage.clickSignInBtn();
	}

	/**
	 * Вписываем логин
	 *
	 * @param {string} login
	 */
	setLogin (login) {
		this.okPage.waitElem(this.okPage.locators.login);
		this.okPage.setValue(login, this.okPage.locators.login);
	}

	/**
	 * Вводим пароль
	 * а до этого дожидаемся появления поля инпут
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		this.okPage.waitElem(this.okPage.locators.password);
		this.okPage.setValue(password, this.okPage.locators.password);
	}
}

module.exports = OkSteps;
