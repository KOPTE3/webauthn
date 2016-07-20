'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let SettingsFoldersPage = require('../../../pages/settings/folders');

class Folders extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SettingsFoldersPage();
	}

	/**
	 * Создать папку
	 *
	 * @param {Object} params - данные папки
	 * @returns {string} - ID созданной папки
	 */
	static createFolder (params) {
		let folderId = this.page.createFolder(params);

		assert(folderId, 'createFolder должен вернуть folderId');

		return folderId;
	}

	/**
	 * Редактировать папку
	 *
	 * @param {Object} params - данные папки
	 */
	static editFolder (params) {
		this.page.editFolder(params);
	}

	/**
	 * Удалить папку
	 *
	 * @param {string} folderId - ID папки
	 */
	static removeFolder (folderId) {
		this.page.removeFolder(folderId);
	}
}

module.exports = Folders;
