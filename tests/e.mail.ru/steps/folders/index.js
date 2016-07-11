'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let FoldersPage = require('../../pages/folders');
let actions = require('../../utils/actions');
let dateUtils = require('../../utils/date');

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
		let actual = this.page.isFolderExists(folderId);

		assert(actual, `Папка "${folderId}" должна присутствовать`);
	}

	static isFolderNotExists (folderId) {
		let actual = this.page.isFolderExists(folderId);

		assert(!actual, `Папка "${folderId}" должна отсутствовать`);
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
		let actual = this.page.isFolderIn(folderId, parentId);

		assert(actual, `Папка "${folderId}" должна быть внутри папки "${parentId}"`);
	}

	static isFolderNotIn (folderId, parentId) {
		let actual = this.page.isFolderIn(folderId, parentId);

		assert(!actual, `Папка "${folderId}" не должна быть внутри папки "${parentId}"`);
	}

	static isFolderInArchive (folderId) {
		let actual = this.page.isFolderIn(folderId, this.page.getArchiveFolderId());

		assert(actual, `Папка "${folderId}" должна быть внутри папки "Архив"`);
	}

	static isFolderNotInArchive (folderId) {
		let actual = this.page.isFolderIn(folderId, this.page.getArchiveFolderId());

		assert(!actual, `Папка "${folderId}" не должна быть внутри папки "Архив"`);
	}

	static isArchiveIn (parentId) {
		let actual = this.page.isFolderIn(this.page.getArchiveFolderId(), parentId);

		assert(actual, `Папка "Архив" должна быть внутри папки "${parentId}"`);
	}

	static isArchiveNotIn (parentId) {
		let actual = this.page.isFolderIn(this.page.getArchiveFolderId(), parentId);

		assert(!actual, `Папка "Архив" не должна быть внутри папки "${parentId}"`);
	}

	/**
	 * Создать папку
	 *
	 * @param {Object} params - данные папки
	 * @returns {string} - ID созданной папки
	 */
	static createFolder (params) {
		let actual = actions.createFolders([params]);

		assert(actual.state && (actual.state === 'success'));

		return actual.value[0];
	}

	static editFolder (params) {
		let actual = actions.editFolders([params]);

		assert(actual.state && (actual.state === 'success'));
	}

	static deleteFolder (folderId) {
		let actual = actions.deleteFolders([folderId]);

		assert(actual.state && (actual.state === 'success'));
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
		return dateUtils.setTimeOffset(offset);
	}

	static resetTimeOffset () {
		return dateUtils.resetTimeOffset();
	}
}

module.exports = FoldersSteps;
