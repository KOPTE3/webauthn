'use strict';

let Steps = require('../index');
let PasswordRestorePage = require('../../pages/passrestore/index');
let phoneUtils = require('../../utils/phones');

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
	 * Записываем ajax для получения reg_token.id
	 * на страницах восстановления пароля и доступа
	 */
	initRegTokenIdLog () {
		phoneUtils.initPassRestoreRegTokenIdLog();
		phoneUtils.initAccessRestoreRegTokenIdLog();
	}

	wait () {
		PasswordRestoreSteps.page.wait();
	}
}

module.exports = PasswordRestoreSteps;
