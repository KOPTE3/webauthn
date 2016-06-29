'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let FoldersPage = require('../../pages/folders');
let SettingsFoldersSteps = require('../../steps/settings/folders');


/** Модуль для работы с шагами списка папкок */
class FoldersSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new FoldersPage();
	}

	static createFolder (data) {
		let settingsFoldersPage = new SettingsFoldersSteps();

		return settingsFoldersPage.createFolder(data);
	}

	static getList () {
		return this.page.getList();
	}

	static setOffsetTime (offset) {
		return this.page.setOffsetTime(offset);
	}

	static resetOffsetTime () {
		return this.page.resetOffsetTime();
	}

	static goToFolder (folderId) {
		return this.page.goToFolder(folderId);
	}

	static isFolderHidden (folderId) {
		let hidden = this.page.isFolderHidden(folderId);

		assert(hidden, 'Папка должна быть скрыта');
	}
}

module.exports = FoldersSteps;
