'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class multiAttach extends Layers {
	constructor () {
		super();
		this.locator = '.is-multiAttachToCompose_in';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, { });
	}
}

module.exports = multiAttach;
