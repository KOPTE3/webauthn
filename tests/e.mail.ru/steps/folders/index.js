'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let FoldersPage = require('../../pages/folders');


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
		let hidden = this.page.isFolderHidden(folderId);

		assert(hidden, 'Папка должна быть схлопнута');
	}

	static isFolderVisible (folderId) {
		let visible = this.page.isFolderVisible(folderId);

		assert(visible, 'Папка должна быть раскрыта');
	}
}

module.exports = FoldersSteps;
