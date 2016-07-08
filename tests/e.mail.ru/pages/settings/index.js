'use strict';

let Page = require('..');

/** Модуль для работы с представлением страницы настроек */
class SettingsPage extends Page {
	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/settings';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.settings__index__widgets'
		};
	}
}

module.exports = SettingsPage;
