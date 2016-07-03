'use strict';

let LoginStore = require('../login');

/** Модуль для работы с данными страниы логина */
class LoginForm extends LoginStore {
	constructor () {
		super();
	}

	/**
	 * Список ссылок
	 *
	 * @type {Object}
	 */
	get links () {
		return {
			passwordRestore: 'https://e.mail.ru/password/restore/',
			signUp         : 'https://e.mail.ru/signup?from=login'
		};
	}

	/**
	 * Учетные записи пользователей
	 *
	 * @type {Object}
	 */
	get users () { }
}

module.exports = LoginForm;
