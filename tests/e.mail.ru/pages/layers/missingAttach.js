'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class missingAttach extends Layers {
	constructor () {
		super();
		this.locator = '.is-compose-missingAttach_in';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = this.locator;
		const buttonContainer = `${container} .popup__controls`;

		return this.extend(super.locators, {
			popupHead: `${container} .popup__head`,
			popupDesc: `${container} .popup__desc`
		});
	}
}

module.exports = missingAttach;
