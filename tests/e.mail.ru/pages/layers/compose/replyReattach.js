'use strict';

let ComposeLayers = require('./');

class ComposeReplyReattachLayer extends ComposeLayers {

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.is-compose-reattach_in';

		return this.extend(super.locators, {
			container,
			cancel: `${container} .confirm-cancel`,
			apply: `${container} [type="submit"]`
		});
	}
}

module.exports = ComposeReplyReattachLayer;
