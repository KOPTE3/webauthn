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

	/**
	 * Есть инлайн-аттач (
	 *
	 * @param {boolean} reverse
	 * @return {boolean}
	 */
	hasInline (reverse = false) {
		let editor = this.getEditor();
		let element = editor.element('img');
		let result = true;

		element.waitForVisible(3000, reverse);

		if (!reverse) {
			let images = editor.elements('img').value;
			let imagesInsideBlockquote = editor.elements('blockquote img').value;

			result = (images.length !== imagesInsideBlockquote.length);
		}

		this.restoreParentFrame();

		return result;
	}

	hasInlineInBlockQuote (reverse = false) {
		let editor = this.getEditor();
		let element = editor.element('blockquote img');

		element.waitForVisible(3000, reverse);
		this.restoreParentFrame();

		return true;
	}
}

module.exports = Compose2Editor;
