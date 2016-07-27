'use strict';

let assert = require('assert');

let Steps = require('../../steps');

/** Модуль для работы с шагами внешних сервисов */
class OauthSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Переопределяем чуть метод, чтобы он отправлял регулярку
	 *
	 * @param {string} url
	 */
	waitForUrl (url) {
		super.waitForUrl(new RegExp(url));
	}
}

module.exports = OauthSteps;
