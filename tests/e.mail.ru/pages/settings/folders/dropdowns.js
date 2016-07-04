'use strict';

let PageObject = require('../../../pages');

class DropdownsPage extends PageObject {
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
			dropdowns: {
				parent: {
					ctrl: '[data-blockid="dialog-folder-add"] .b-dropdown__ctrl',
					list: '[data-blockid="dialog-folder-add"] .b-dropdown__list'
				}
			}
		};
	}

	clickCtrl (name) {
		this.page.click(this.locators.dropdowns[name].ctrl);
		this.page.waitForExist(this.locators.dropdowns[name].list);
	}

	setDropdownValue (name, value) {
		this.clickCtrl(name);
		this.page.click(this.locators.dropdowns[name].list + ' [data-value="' + value + '"]');
	}
}

module.exports = DropdownsPage;
