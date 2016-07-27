'use strict';

let assert = require('assert');

let OauthSteps = require('../../steps/oauth');
let GmailPage = require('../../pages/oauth/gmail');

let oauthSteps = new OauthSteps();

let oauthStore = require('../../store/authorization/oauth');

/** Модуль для работы с шагами сервиса gmail.com */
class GmailSteps extends OauthSteps {
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

	/**
	 * Ожидаем пока появится нужный урл
	 *
	 */
	waitSelfUrl () {
		oauthSteps.waitForUrl(new RegExp(oauthStore.url.gmail));
	}
}

module.exports = GmailSteps;
