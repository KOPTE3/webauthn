'use strict';

let assert = require('assert');

let PassrestoreSteps = require('../passrestore');
let RecoveryPage = require('../../pages/passrestore/recovery');

/** Модуль для работы с формой ввода адреса для восстановления */
class RecoverySteps extends PassrestoreSteps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	get page () {
		return new RecoveryPage();
	}


	/**
	 * Дождаться открытия страницы
	 *
	 */
	wait () {
		let result = this.page.wait();

		assert(result, `Страница ввода нового пароля не открылась`);
	}
}

module.exports = RecoverySteps;
