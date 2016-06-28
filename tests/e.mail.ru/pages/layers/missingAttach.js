'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class missingAttach extends Layers {
	constructor () {
		super();
		this.name = '.is-compose-missingAttach_in';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: this.name
		});
	}
}

module.exports = missingAttach;
