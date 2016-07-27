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
	 * ссылка на текущий page
	 *
	 * @returns {VkPage}
	 */
	get page () {
		return this.gmailPage;
	}
}

module.exports = GmailSteps;
