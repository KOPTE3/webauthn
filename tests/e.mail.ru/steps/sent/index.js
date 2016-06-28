'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let page = require('../../pages/sent');
let SentPage = require('../../pages/sent');

/** Модуль для работы с шагами страницы отправленного письма */
class Sent extends Steps {
	constructor () {
		super();
	}

	/**
	 * Открыть страницу
	 *
	 * @param {Object} [query] — параметры запроса
	 */
	open (query) {
		let actual = page.open(query);

		assert(actual, 'Не удалось открыть страницу отправленного письма');
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SentPage();
	}

	/**
	 * Метод дожидается открытия страницы успешной загрузки
	 * */
	static wait () {
		this.page.wait();
	}
}

module.exports = new Sent();
