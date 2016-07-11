'use strict';

let PageObject = require('../../../pages');

class ControlsPage extends PageObject {
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
			newFolder: '[data-name="newFolder"]'
		};
	}

	newFolder () {
		this.page.click(this.locators.newFolder);
	}
}

module.exports = ControlsPage;
