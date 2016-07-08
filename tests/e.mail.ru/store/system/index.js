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
		return browser.desiredCapabilities.platform;
	}

	/**
	 * Тестовый урл
	 *
	 * @type {string}
	 */
	get host () {
		return browser.options.hostname;
	}
}

module.exports = Sent;
