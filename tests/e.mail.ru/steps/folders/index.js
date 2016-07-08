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

	static isFolderVisible (folderId) {
		let actual = this.page.isFolderVisible(folderId);

		assert(actual, `Папка "${folderId}" должна быть раскрыта`);
	}

	static isFolderHidden (folderId) {
		let actual = this.page.isFolderVisible(folderId);

		assert(!actual, `Папка "${folderId}" должна быть схлопнута`);
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

	static isFolderIn (folderId, parentId) {
		let result = this.page.isFolderIn(folderId, parentId);

		assert(result, `Папка "${folderId}" должна быть внутри папки "${parentId}"`);
	}

	static isFolderNotIn (folderId, parentId) {
		let result = this.page.isFolderIn(folderId, parentId);

		assert(!result, `Папка "${folderId}" не должна быть внутри папки "${parentId}"`);
	}

	static isFolderInArchive (folderId) {
		let result = this.page.isFolderIn(folderId, this.page.getArchiveFolderId());

		assert(result, `Папка "${folderId}" должна быть внутри папки "Архив"`);
	}

	static isFolderNotInArchive (folderId) {
		let result = this.page.isFolderIn(folderId, this.page.getArchiveFolderId());

		assert(!result, `Папка "${folderId}" не должна быть внутри папки "Архив"`);
	}

	static isArchiveIn (parentId) {
		let result = this.page.isFolderIn(this.page.getArchiveFolderId(), parentId);

		assert(result, `Папка "Архив" должна быть внутри папки "${parentId}"`);
	}

	static isArchiveNotIn (parentId) {
		let result = this.page.isFolderIn(this.page.getArchiveFolderId(), parentId);

		assert(!result, `Папка "Архив" не должна быть внутри папки "${parentId}"`);
	}

	/**
	 * Создать папку
	 *
	 * @param {Object} params - данные папки
	 * @returns {string} - ID созданной папки
	 */
	static createFolder (params) {
		let result = actions.createFolders([params]);

		assert(result.state && (result.state === 'success'));

		return result.value[0];
	}

	static editFolder (params) {
		let result = actions.editFolders([params]);

		assert(result.state && (result.state === 'success'));
	}

	static deleteFolder (folderId) {
		let result = actions.deleteFolders([folderId]);

		assert(result.state && (result.state === 'success'));
	}

	static createArchive () {
		return this.createFolder({
			name: 'Архив',
			parent: -1,
			type: 'archive',
			'only_web': true
		});
	}

	static createArchiveIn (parentId) {
		return this.createFolder({
			name: 'Архив',
			parent: parentId,
			type: 'archive',
			'only_web': false
		});
	}

	static convertFolderToArchive (folderId) {
		return this.editFolder({
			id: folderId,
			// type: 'archive' // Не работает, WTF?
			archive: true // Работает, хотя эта опция deprecated
		});
	}

	static deleteArchive () {
		return this.deleteFolder(this.page.getArchiveFolderId());
	}

	static setTimeOffset (offset) {
		return date.setTimeOffset(offset);
	}

	static resetTimeOffset () {
		return date.resetTimeOffset();
	}
}

module.exports = FoldersSteps;
