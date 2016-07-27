'use strict';

let assert = require('assert');

let OAuthSteps = require('../../steps/oauth');
let OkPage = require('../../pages/oauth/ok');

let oauthSteps = new OAuthSteps();

/** Модуль для работы с шагами сервиса ok.com */
class OkSteps extends OAuthSteps {
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
	 * ссылка на текущий page
	 *
	 * @returns {VkPage}
	 */
	get page () {
		return this.okPage;
	}
}

module.exports = OkSteps;
