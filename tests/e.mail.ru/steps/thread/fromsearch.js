'use strict';

let assert = require('assert');

let Thread = require('./');
let ThreadFromsearchPage = require('../../pages/thread/fromsearch');

/** Модуль для работы с шагами страницы треда после поиска */
class ThreadSteps extends Thread {
	constructor () {
		super();

		this.threadPage = new ThreadFromsearchPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new ThreadFromsearchPage();
	}
}

module.exports = ThreadSteps;
