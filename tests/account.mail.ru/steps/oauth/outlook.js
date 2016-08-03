'use strict';

let assert = require('assert');

let OAuthSteps = require('../../steps/oauth');
let OutlookPage = require('../../pages/oauth/outlook');

let oauthSteps = new OAuthSteps();

/** Модуль для работы с шагами сервиса outlook.com */
class OutlookSteps extends OAuthSteps {
	constructor () {
		super();

		this.outlookPage = new OutlookPage();
	}

	/**
	 * ссылка на текущий page
	 *
	 * @returns {VkPage}
	 */
	get page () {
		return this.outlookPage;
	}
}

module.exports = OutlookSteps;
