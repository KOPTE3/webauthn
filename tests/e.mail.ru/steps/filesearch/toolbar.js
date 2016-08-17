'use strict';

let assert = require('assert');

let FilesearchToolbarPage = require('../../pages/filesearch/toolbar');
let FilesearchSteps = require('../filesearch');

/** Модуль для работы с формой страницы написания письма */
class FilesearchToolbarSteps extends FilesearchSteps {
	constructor () {
		super();
		this.toolbarPage = new FilesearchToolbarPage();
	}

	/**
	 * Метод меняет тип вида отображения списка файлов (thumbs/list)
	 * @param {string} type - тип отображения (thumbs/list)
	 */
	changeState (type) {
		this.toolbarPage.changeState(type);

		assert(this.toolbarPage.getActiveState(), name);
	}

	download () {
		this.toolbarPage.clickButton('download');
	}
}

module.exports = FilesearchToolbarSteps;
