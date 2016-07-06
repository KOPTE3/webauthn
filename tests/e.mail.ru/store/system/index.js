'use strict';

let Store = require('../../store');

/** Модуль для работы с данными пользовательского окружения */
class Sent extends Store {
	constructor () {
		super();
	}

	/**
	 * Название браузера
	 *
	 * @type {string}
	 */
	get browser () {
		return browser.desiredCapabilities.browserName;
	}

	/**
	 * Название платформы
	 *
	 * @type {string}
	 */
	get platform () {
		let status = browser.status();

		return browser.desiredCapabilities.platform || status.value.os.name;
	}
}

module.exports = Sent;
