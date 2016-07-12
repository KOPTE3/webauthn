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
			layout: '.mceLayout',
			body: '.mceContentBody',
			editor: '.mceIframeContainer iframe'
		});
	}

	/**
	 * Дождаться открытия редактора
	 *
	 * @returns {boolean}
	 */
	wait () {
		this.page.waitForVisible(this.locators.container);

		return this.page.isVisible(this.locators.container);
	}

	/**
	 * Получить редактор сообщения
	 * После этого вызова обязательно restoreParentFrame!
	 *
	 * @returns {Element}
	 */
	getEditor () {
		console.log('get');
		let frameId = this.page.getAttribute(this.locators.editor, 'id');

		return this.page.frame(frameId).element(this.locators.body);
	}

	restoreParentFrame () {
		console.log('restore');
		this.page.frameParent();
	}
}

module.exports = ComposeEditor;
