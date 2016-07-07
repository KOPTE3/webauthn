'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let FoldersPage = require('../../pages/folders');
let actions = require('../../utils/actions');
let date = require('../../utils/date');

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

		assert(actual, `Папка "${folderId}" должна быть схлопнута`);
	}

	static isFolderVisible (folderId) {
		let actual = this.page.isFolderVisible(folderId);

		assert(actual, `Папка "${folderId}" должна быть раскрыта`);
	}

	static isFolderExists (folderId) {
		let result = this.page.isFolderExists(folderId);

		assert(result, `Папка "${folderId}" должна присутствовать`);
	}

	static isFolderNotExists (folderId) {
		let result = this.page.isFolderExists(folderId);

		assert(!result, `Папка "${folderId}" должна отсутствовать`);
	}

	static isArchiveExists () {
		let id = this.page.getArchiveFolderId();

		assert(id, 'Папка "Архив" должна присутствовать');
	}

	static isArchiveNotExists () {
		let id = this.page.getArchiveFolderId();

		assert(!id, 'Папка "Архив" должна отсутствовать');
	}

	static isSocialExistsInArchive () {
		let result = this.page.isFolderIn('500011', this.page.getArchiveFolderId());

		assert(result, `Папка "Социальные сети" должна присутствовать в папке "Архив"`);
	}

	static isPromotionsExistsInArchive () {
		let result = this.page.isFolderIn('500012', this.page.getArchiveFolderId());

		assert(result, `Папка "Скидки" должна присутствовать в папке "Архив"`);
	}

	static isNewslettersExistsInArchive () {
		let result = this.page.isFolderIn('500013', this.page.getArchiveFolderId());

		assert(result, `Папка "Рассылки" должна присутствовать в папке "Архив"`);
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
