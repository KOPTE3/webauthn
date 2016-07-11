'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class MissingAttach extends Layers {
	constructor () {
		super();
		this.locator = '.is-secure_in';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: ''
		});
	}
}

module.exports = MissingAttach;
