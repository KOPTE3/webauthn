'use strict';

let Store = require('../../store');

/** Модуль для работы с аттачами */
class Compose extends Store {
	constructor () {
		super();
	}

	/**
	 * Возвращает путь, где располагаются тестовые файлы
	 *
	 * @type {string}
	 */
	get path () {
		if (/win/.test(browser.desiredCapabilities.platform)) {
			return '/var/lib/selenium/Dropbox/feta/mail';
		}

		return '';
	}
}
