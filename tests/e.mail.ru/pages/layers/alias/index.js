'use strict';

let Layers = require('../../../pages/layers');

class AliasLayers extends Layers {

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let {container} = super.locators;

		return this.extend(super.locators, {
			fields: {
				apply: `${container} [data-name="submit"]`
			}
		});
	}

	apply () {
		this.getField('apply').click();
	}

	getField (name) {
		return this.page.element(this.locators.fields[name]);
	}

	setFieldValue (name, value) {
		this.getField(name).setValue(value);
	}

	getFieldValue (name) {
		return this.getField(name).getValue();
	}

	getDropdownValue (name) {
		let dropdown = this.locators.dropdowns[name];
		let ctrl = this.page.element(`${dropdown.ctrl}`);

		return ctrl.getText();
	}
}

module.exports = AliasLayers;
