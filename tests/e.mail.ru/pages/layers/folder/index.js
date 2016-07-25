'use strict';

let Layers = require('../../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class FolderAdd extends Layers {

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

	getFields () {
		let {fields} = this.locators;
		let result = {};

		Object.keys(fields).forEach(name => {
			fields[name] = this.getField(name);
		});

		return fields;
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

	setCheckboxValue (name, checked) {
		let {checkboxes} = this.locators;
		let checkbox = this.page.element(checkboxes[name]);

		if (checkbox.isSelected() !== checked) {
			checkbox.click();
		}
	}

	isVisible () {
		return this.page.isVisible(this.locators.container);
	}
}

module.exports = FolderAdd;
