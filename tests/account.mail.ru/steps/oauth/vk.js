'use strict';

let assert = require('assert');

let OAuthSteps = require('../../steps/oauth');
let VkPage = require('../../pages/oauth/vk');

let oauthSteps = new OAuthSteps();

/** Модуль для работы с шагами сервиса vk.com */
class VkSteps extends OAuthSteps {
	constructor () {
		super();

		this.vkPage = new VkPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new VkPage();
	}

	/**
	 * Клик по кнопке авторизации
	 */
	clickSignInBtn () {
		this.vkPage.clickSignInBtn();
	}

	/**
	 * Вписываем логин
	 *
	 * @param {string} login
	 */
	setLogin (login) {
		this.vkPage.waitElem(this.vkPage.locators.login);
		this.vkPage.setValue(login, this.vkPage.locators.login);
	}

	/**
	 * Вводим пароль
	 * а до этого дожидаемся появления поля инпут
	 *
	 * @param {string} password
	 */
	setPassword (password) {
		this.vkPage.waitElem(this.vkPage.locators.password);
		this.vkPage.setValue(password, this.vkPage.locators.password);
	}
}

module.exports = VkSteps;
