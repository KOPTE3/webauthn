'use strict';

let FolderLayers = require('./');

/** Модуль для работы с лером прикрепления аттачей */
class FolderRemove extends FolderLayers {

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: '.is-folder-remove_in'
		});
	}
}

module.exports = FolderRemove;
