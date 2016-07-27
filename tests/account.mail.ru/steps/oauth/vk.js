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
	 * ссылка на текущий page
	 *
	 * @returns {VkPage}
	 */
	get page () {
		return this.vkPage;
	}
}

module.exports = VkSteps;
