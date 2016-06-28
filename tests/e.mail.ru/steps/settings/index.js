'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let SettingsPage = require('../../pages/settings');

/** Модуль для работы с шагами страницы настроек */
class SettingsSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SettingsPage();
	}
}

module.exports = SettingsSteps;
