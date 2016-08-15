'use strict';

let ComposeEditor = require('../compose/editor');

/** Модуль для работы с редактором страницы написания письма */
class Compose2Editor extends ComposeEditor {
	constructor () {
		super();
	}

	/**
	 * Дождаться открытия редактора
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForExist(this.locators.container);
	}

	waitForInlineAttach (id) {
		let editor = this.getEditor();
		let element = editor.element(`//img[contains(@src, '${id}')]`);

		element.waitForVisible();
		this.restoreParentFrame();
		
		return element;
	}
}

module.exports = Compose2Editor;
