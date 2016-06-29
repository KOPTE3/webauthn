'use strict';

let ComposePage = require('../compose');

/** Модуль для работы с редактором страницы написания письма */
class ComposeEditor extends ComposePage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: '.mceToolbarRow1',
			body: '.mceContentBody',
			editor: '.mceIframeContainer iframe'
		});
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
		this.page.frameParent();
	}

}

module.exports = ComposeEditor;
