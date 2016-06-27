'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с контролами страницы написания письма */
class Controls extends PageObject {
	constructor () {
		super();
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '[data-mnemo="toolbar-compose"]',
			saveDraft: '[data-mnemo="toolbar-compose"] [data-name="saveDraft"]',
			send: '[data-mnemo="toolbar-compose"] [data-name="send"]',
			cancel: '[data-mnemo="toolbar-compose"] [data-name="cancel"]',
			compose  : '[data-mnemo="toolbar-compose"] [data-name="send"]'
		};
	}

	/**
	 * Сохранить черновик
	 */
	saveDraft () {
		this.page.click(this.locators.saveDraft);
	}

	/**
	 * Написать письмо
	 */
	compose () {
		this.page.click(this.locators.compose);
	}

}

module.exports = new Controls();
