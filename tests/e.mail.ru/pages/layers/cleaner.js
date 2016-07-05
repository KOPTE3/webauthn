'use strict';

let LayersPage = require('..');

/** Модуль для работы с лаером разбериящика */
class CleanerPage extends LayersPage {
	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: 'body'
		};
	}

	waitForCleaner () {
		this.page.waitForVisible('.js-cleaner1');
	}
}

module.exports = CleanerPage;
