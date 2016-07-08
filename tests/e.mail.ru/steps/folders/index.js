'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let FoldersPage = require('../../pages/folders');
let Actions = require('../../utils/actions');
let DateUtils = require('../../utils/date');
let actions = new Actions();
let date = new DateUtils();

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

	static goToFolder (folderId) {
		return this.page.goToFolder(folderId);
	}

	static isFolderHidden (folderId) {
		let actual = this.page.isFolderHidden(folderId);

		assert(actual, 'Папка должна быть схлопнута');
	}

	static isFolderVisible (folderId) {
		let actual = this.page.isFolderVisible(folderId);

		assert(actual, 'Папка должна быть раскрыта');
	}

	/**
	 * Создать папку
	 *
	 * @param {Object} params - данные папки
	 * @returns {string} - ID созданной папки
	 */
	static createFolder (params) {
		let [folderId] = actions.createFolders([params]).value;

		return folderId;
	}

	static setTimeOffset (offset) {
		return date.setTimeOffset(offset);
	}

	static resetTimeOffset () {
		return date.resetTimeOffset();
	}
}

module.exports = FoldersSteps;
