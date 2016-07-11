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
		return browser.desiredCapabilities.platform;
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
