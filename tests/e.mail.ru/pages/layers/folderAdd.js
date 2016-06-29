'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class FolderAdd extends Layers {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: '.is-folder-add_in',
			apply: '.is-folder-add_in [data-name="submit"]'
		});
	}
}

module.exports = FolderAdd;
