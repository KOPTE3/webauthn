'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением списка папок */
class FoldersPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-nav_folders'
		};
	}
}

module.exports = FoldersPage;
