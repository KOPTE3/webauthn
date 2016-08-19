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
		return this.page.waitForVisible(this.locators.container);
	}

	/**
	 * Получить редактор сообщения
	 * После этого вызова обязательно restoreParentFrame!
	 *
	 * @returns {Element}
	 */
	getEditor () {
		let frameId = this.page.getAttribute(this.locators.editor, 'id');

		return this.page.frame(frameId).element(this.locators.body);
	}

	restoreParentFrame () {
		this.page.frameParent();
	}

	/**
	 * Принимаем сообщение алерта
	 */
	alertAccept () {
		this.page.alertAccept();
	}
}

module.exports = ComposeEditor;
