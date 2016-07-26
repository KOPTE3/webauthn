'use strict';

let Layers = require('../../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class FolderLayers extends Layers {

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			fields: {
				apply: '[data-name="submit"]'
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

module.exports = FolderLayers;
