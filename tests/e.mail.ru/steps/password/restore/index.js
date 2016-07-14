'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let PasswordRestorePage = require('../../../pages/passrestore');
let phonesUtils = require('../../../utils/phones');

/** Модуль для работы с шагами страницы восстановления пароля */
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

	/**
	 * Звписываем ajax для получения reg_token.id
	 * @returns {Object}
	 */
	initRegTokenIdLog () {
		return phonesUtils.registerPassrestoreLogger();
	}
}

module.exports = PasswordRestoreSteps;
