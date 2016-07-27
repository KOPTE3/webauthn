'use strict';

let Layers = require('../../../pages/layers');

class ComposeLayers extends Layers {

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
}

module.exports = ComposeLayers;
