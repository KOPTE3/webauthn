'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class FolderEdit extends Layers {
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
			container: '.is-folder-edit_in',
			fields: {
				name: '[name="name"]',
				apply: '[data-name="submit"]'
			},
			dropdowns: {
				parent: {
					container: '[data-blockid="dialog-folder-edit"]',
					ctrl: '.b-dropdown__ctrl',
					list: '.b-dropdown__list'
				}
			}
		});
	}

	apply () {
		this.getField('apply').click();
	}

	getField (name) {
		let {container, fields} = this.locators;

		return this.page.element(`${container} ${fields[name]}`);
	}

	setFieldValue (name, value) {
		this.getField(name).setValue(value);
	}

	clickDropdownCtrl (name) {
		let {container, dropdowns} = this.locators;
		let dropdown = dropdowns[name];

		this.page.click(`${container} ${dropdown.container} ${dropdown.ctrl}`);
		this.page.waitForExist(`${container} ${dropdown.container} ${dropdown.list}`);
	}

	setDropdownValue (name, value) {
		let {container, dropdowns} = this.locators;
		let dropdown = dropdowns[name];

		this.clickDropdownCtrl(name);

		let locator = `${container} ${dropdown.container} ${dropdown.list} [data-value="${value}"]`;

		this.page.click(locator);
	}
}

module.exports = FolderEdit;
