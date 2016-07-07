'use strict';

let assert = require('assert');

let PasswordSteps = require('../../password');
let PasswordRestorePage = require('../../../pages/passrestore');
let phones = require('../../../utils/phones');

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

	/**
	 * Звписываем ajax для получения reg_token.id
	 * @returns {Object}
	 */
	initRegTokenIdLog () {
		return phones.registerPassrestoreLogger();
	}
}

module.exports = PasswordRestoreSteps;
