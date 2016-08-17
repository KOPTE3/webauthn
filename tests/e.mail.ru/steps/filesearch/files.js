'use strict';

let assert = require('assert');

let FilesPage = require('../../pages/filesearch/files');
let FilesearchSteps = require('../filesearch');
let FilesContextMenu = require('../../pages/filesearch/contextmenu');

/** Модуль для работы с формой страницы написания письма */
class FilesearchToolbarSteps extends FilesearchSteps {
	constructor () {
		super();
		this.filesPage = new FilesPage();
		this.contextMenuPage = new FilesContextMenu();
	}

	/**
	 * Скачать файл
	 *
	 * @param {string}[id] - идентификатор файла (если не передан, то берется самый новый)
	 * @returns {boolean} - смог ли нажать на скачать
	 */
	clickDonwloadLink (id) {
		return this.filesPage.clickDonwloadLink(id);
	}

	/**
	 * Отметить файл
	 * @param {string}[id] - идентификатор файла (если не передан, то берется самый новый)
	 * @returns {*|boolean}
	 */
	selectFile (id) {
		return this.filesPage.selectFile(id);
	}

	/**
	 * Метод открывает контекстное меня для заданного файла
	 *@param {string}[id] - идентификатор файла (если не передан, то берется самый новый)
	 */
	openContextMenu (id) {
		this.filesPage.rightClickOnFile(id);
		this.contextMenuPage.wait();
	}

}

module.exports = FilesearchToolbarSteps;
