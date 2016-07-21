'use strict';

const FOLDER_COLLAPSE_FEATURE = 'collapse-folder';

let assert = require('assert');

let Steps = require('../../steps');
let FoldersPage = require('../../pages/folders');
let SearchPage = require('../../pages/search');
let actions = require('../../utils/actions');
let dateUtils = require('../../utils/date');
let store = require('../../store');

/** Модуль для работы с шагами списка папкок */
class FoldersSteps extends Steps {

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new FoldersPage();
	}

	static get search () {
		return new SearchPage();
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

	static setCloseFolder (folderId) {
		let actual = actions.closeFolders([folderId]);

		assert.equal(actual.state, 'success', 'Не удалось закрыть запароленную папку');
	}

	static setExpandFolder (folderId) {
		let actual = actions.expandFolders([folderId]);

		assert.equal(actual.state, 'success', 'Не удалось расхлопнуть папку');
	}

	static setCollapseFolder (folderId) {
		let actual = actions.collapseFolders([folderId]);

		assert.equal(actual.state, 'success', 'Не удалось схлопнуть папку');
	}

	static expandFolder (folderId) {
		this.page.expandFolder(folderId);
	}

	static collapseFolder (folderId) {
		this.page.collapseFolder(folderId);
	}

	static toggleFolder (folderId) {
		this.page.toggleFolder(folderId);
	}

	/**
	 * Создать папки
	 *
	 * @param {Object} folders - данные папок
	 * @returns {string} - IDs созданных папок
	 */
	static createFolders (folders) {
		let actual = actions.createFolders(folders);

		assert.equal(actual.state, 'success', 'Не удалось создать папки');

		return actual.value;
	}

	/**
	 * Создать папку
	 *
	 * @param {Object} folder - данные папки
	 * @returns {string} - ID созданной папки
	 */
	static createFolder (folder) {
		return this.createFolders([folder])[0];
	}

	static editFolder (params) {
		let actual = actions.editFolders([params]);

		assert.equal(actual.state, 'success', 'Не удалось отредактировать папку');
	}

	static deleteFolder (folderId) {
		let actual = actions.deleteFolders([folderId]);

		assert.equal(actual.state, 'success', 'Не удалось удалить папку');
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

	/**
	 * Смещает текущее время
	 * @param {number} offset - секунды
	 * @param {boolean} [relative] - прибавить к текущему
	 */
	static setTimeOffset (offset, relative) {
		dateUtils.setTimeOffset(offset, relative);
	}

	/**
	 * Восстанавливает оригинальную дату
	 */
	static resetTimeOffset () {
		dateUtils.resetTimeOffset();
	}

	static enableCollapseFeature (collapseTimeout, updatePeriod, useLastVisit) {
		let params = `${collapseTimeout}|${updatePeriod}|${Number(useLastVisit)}`;
		let feature = `${FOLDER_COLLAPSE_FEATURE}`;

		browser.execute(function (updatePeriod) {
			$.ajaxSetup({
				data: {
					folder_update_period: updatePeriod
				}
			});
		}, updatePeriod);

		this.features([`${feature}:${params}`]);
	}

	static enableThreads () {
		actions.helperUpdate(store.helpers.threads, {
			state: true,
			time: true
		});
	}

	/**
	 * Нажать на фильтр
	 *
	 * @param {string} name - (unread|flag|attach)
	 */
	static clickFilter (name) {
		this.page.clickFilter(name);

		let actual = this.search.wait();

		assert(actual, 'Не удалось дождаться открытия страницы поиска');
	}
}

module.exports = FoldersSteps;
