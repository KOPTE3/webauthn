'use strict';

let FolderLayers = require('./');

/** Модуль для работы с лером прикрепления аттачей */
class FolderEdit extends FolderLayers {

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: '.is-folder-edit_in',
			fields: {
				name: '[name="name"]'
			},
			dropdowns: {
				parent: {
					container: '[data-blockid="dialog-folder-edit"]',
					ctrl: '.b-dropdown__ctrl',
					list: '.b-dropdown__list'
				}
			}
		});
	}
}

module.exports = FolderEdit;
