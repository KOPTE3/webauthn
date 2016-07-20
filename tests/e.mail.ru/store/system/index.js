'use strict';

/** Набор методов для работы с данными пользовательского окружения */
module.exports = {
	/**
	 * Название браузера
	 *
	 * @type {string}
	 */
	get browser () {
		return browser.desiredCapabilities.browserName;
	},

	/**
	 * Название платформы
	 *
	 * @type {string}
	 */
	get platform () {
		let status = browser.status();

		return browser.desiredCapabilities.platform || status.value.os.name;
	},

	/**
	 * Тестовый урл
	 *
	 * @type {string}
	 */
	get host () {
		return browser.options.hostname;
	}
};
