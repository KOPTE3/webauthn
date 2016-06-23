'use strict';

let PageObject = require('../../pages');

/** @namespace browser */

class Editor extends PageObject {
	constructor () {
		super();
	}

	get locators () {
		return {
			container: '.mceToolbarRow1'
		};
	}

	/**
	 * Дождаться открытия страницы написания письма
	 *
	 * @return {boolean}
	 */
	wait () {
		return browser.waitForExist(this.locators.container);
	}
}

module.exports = new Editor();
