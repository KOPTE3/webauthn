'use strict';

let LayersPage = require('..');

/** Модуль для работы с лаером разбериящика */
class CleanerPage extends LayersPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: '.b-layer__container_cleaner'
		});
	}
}

module.exports = cleaner;
