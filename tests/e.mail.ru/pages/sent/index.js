'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы отправленного письма */
class Sent extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/sendmsgok';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '#b-compose__sent'
		};
	}

	/**
	 * Проверить что страница отправки сообщения показана
	 *
	 * @return {Promise}
	 */
	isVisible () {
		this.page.waitForVisible(this.locators.container);
		
		return this.page.isVisible(this.locators.container);
	}

}

module.exports = Sent;
