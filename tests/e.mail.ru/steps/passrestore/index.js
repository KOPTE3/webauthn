'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let PasswordRestorePage = require('../../pages/passrestore');

/** Модуль для работы с шагами страницы поиска */
class PasswordRestoreSteps extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new PasswordRestorePage();
	}
}

module.exports = PasswordRestoreSteps;
