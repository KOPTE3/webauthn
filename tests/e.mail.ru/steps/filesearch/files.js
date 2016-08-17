'use strict';

let assert = require('assert');

let FilesPage = require('../../pages/filesearch/files');
let FilesearchSteps = require('../filesearch');

/** Модуль для работы с формой страницы написания письма */
class FilesearchToolbarSteps extends FilesearchSteps {
	constructor () {
		super();
		this.filesPage = new FilesPage();
	}

	/**
	 * Скачать файл
	 *
	 * @param {string}[id] - идентификатор аттача (если не передан, то берется самый новый)
	 * @returns {boolean} - смог ли нажать на скачать
	 */
	clickDonwloadLink (id) {
		return this.filesPage.clickDonwloadLink(id);
	}

	/**
	 * Отметить файл
	 * @param {string}[id] - идентификатор аттача (если не передан, то берется самый новый)
	 * @returns {*|boolean}
	 */
	selectFile (id) {
		return this.filesPage.selectFile(id);
	}

}

module.exports = FilesearchToolbarSteps;
