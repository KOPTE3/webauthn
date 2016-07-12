'use strict';

const FOLDER_COLLAPSE_FEATURE = 'collapse-folder';

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

	static isFolderHidden (folderId) {
		let actual = this.page.isFolderHidden(folderId);

		assert(actual, 'Папка должна быть схлопнута');
	}

	static isFolderVisible (folderId) {
		let actual = this.page.isFolderVisible(folderId);

		assert(actual, 'Папка должна быть раскрыта');
	}

	static expandFolder (folderId) {
		actions.expandFolders([folderId]);
	}

	static collapseFolder (folderId) {
		actions.collapseFolders([folderId]);
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

	/**
	 * Редактировать папку
	 *
	 * @param {Object} params - данные папки
	 */
	static editFolder (params) {
		actions.editFolders([params]);
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

		this.features([`${feature}:${params}`]);
	}

	static enableThreads () {
		actions.helperUpdate(63, {
			state: true,
			time: true
		});
	}
}

module.exports = FoldersSteps;
