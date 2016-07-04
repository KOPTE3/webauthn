'use strict';

let PageObject = require('../../../pages');

class FoldersPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/settings/folders';
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-folders',
			item: '.b-folders__item',
			itemWithParam: '.b-folders__item-col_title'
		};
	}

	waitAddSuccess (data) {
		let {container, item} = this.locators;
		let locator = `${container} ${item} [data-parent="${data.parent}"]`;

		this.page.waitForExist(locator);
	}
}

module.exports = FoldersPage;
