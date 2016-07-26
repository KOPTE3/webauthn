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
				name: '[name="name"]',
				folderPassword: '[name="password"]',
				folderRepassword: '[name="password_repeat"]',
				question: '[name="question"]',
				answer: '[name="answer"]',
				userPassword: '[name="user_password"][type="password"]'
			},
			dropdowns: {
				parent: {
					container: '[data-blockid="dialog-folder-edit"]',
					ctrl: '.b-dropdown__ctrl',
					list: '.b-dropdown__list'
				}
			},
			checkboxes: {
				secret: 'input[name="secret"]'
			}
		});
	}
}

module.exports = FolderEdit;
