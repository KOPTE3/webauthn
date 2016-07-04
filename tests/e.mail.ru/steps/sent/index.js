'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let SentPage = require('../../pages/sent');

/** Модуль для работы с шагами страницы отправленного письма */
class SentSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 * @static
	 */
	static get page () {
		return new SentPage();
	}

	/**
	 * Метод дожидается открытия страницы успешной загрузки
	 *
	 * @static
	 * */
	static wait () {
		this.page.wait();
	}


	/**
	 * Метод дожидается открытия страницы успешной загрузки
	 *
	 * @static
	 * */
	static isVisible () {
		assert(this.page.isVisible(), 'Страница успешной отправки не показана');
	}


}

module.exports = SentSteps;
