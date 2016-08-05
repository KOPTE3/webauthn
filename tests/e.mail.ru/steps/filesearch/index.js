'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let FileSearchPage = require('../../pages/filesearch');
let foldersStore = require('../../store/folders');

/** Модуль для работы с шагами страницы поиска файлов */
class FileSearchSteps extends Steps {
	constructor () {
		super();

		this.fileSearchPage = new FileSearchPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new FileSearchPage();
	}

	/**
	 * Выбрать заданную папку
	 *
	 * @see foldersStore.ids
	 * @param {string} name
	 */
	goToFolder (name) {
		let id = foldersStore.ids[name];

		if (!id) {
			assert(actual, `Невозможно найти папку с указанным имененем ${name}`);
		}

		this.fileSearchPage.goToFolder(id);
	}

	/**
	 * Возвращает состояние папки
	 */
	isEmptyFolder () {
		let actual = this.fileSearchPage.isEmptyFolder();

		assert(actual, 'Содержимое папки не пустое');
	}
}

module.exports = FileSearchSteps;
