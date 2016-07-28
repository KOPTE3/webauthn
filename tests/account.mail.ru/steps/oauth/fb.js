'use strict';

let assert = require('assert');

let OAuthSteps = require('../../steps/oauth');
let FbPage = require('../../pages/oauth/fb');

let oauthSteps = new OAuthSteps();

/** Модуль для работы с шагами сервиса fb.com */
class FbSteps extends OAuthSteps {
	constructor () {
		super();

		this.fbPage = new FbPage();
	}

	/**
	 * ссылка на текущий page
	 *
	 * @returns {VkPage}
	 */
	get page () {
		return this.fbPage;
	}
}

module.exports = FbSteps;
