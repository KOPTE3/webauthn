'use strict';

let assert = require('assert');

let PasswordSteps = require('../../password');
let PasswordRestorePage = require('../../../pages/passrestore');

/** Модуль для работы с шагами страницы поиска */
class PasswordRestoreSteps extends PasswordSteps {
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
