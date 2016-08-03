'use strict';

let ComposeLayers = require('./');

class ComposeEmptyTextLayers extends ComposeLayers {

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.is-compose-empty_in';

		return this.extend(super.locators, {
			container,
			fields: {
				apply: `${container} [type="submit"]`
			}
		});
	}
}

module.exports = ComposeEmptyTextLayers;
