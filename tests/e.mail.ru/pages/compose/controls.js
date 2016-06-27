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
			cancel: '[data-mnemo="toolbar-compose"] [data-name="cancel"]'
		};
	}

	/**
	 * Сохранить черновик
	 */
	saveDraft () {
		this.page.click(this.locators.saveDraft);
	}

	/**
	 * Отправить сообщение
	 */
	sendMessage () {
		this.page.click(this.locators.send);
	}


}

module.exports = new Controls();
