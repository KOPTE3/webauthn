'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с редактором страницы написания письма */
class Editor extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.mceToolbarRow1',
			body: '.mceContentBody',
			editor: '.mceIframeContainer iframe'
		};
	}

	/**
	 * Дождаться открытия страницы написания письма
	 *
	 * @return {boolean}
	 */
	wait () {
		return this.page.waitForExist(this.locators.container);
	}

	/**
	 * Получить редактор сообщения
	 * @return {element}
	 */
	getEditor () {
		var frameId = this.page.getAttribute(this.locators.editor, 'id');

		return this.page.frame(frameId).element(this.locators.body);
	}

	restoreParentFrame () {
		this.frameParent();
	}

}

module.exports = new Editor();
