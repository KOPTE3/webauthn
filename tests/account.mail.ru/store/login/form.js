'use strict';

let providers = require('../../../e.mail.ru/store/authorization/providers');

/** Модуль для работы с данными страниы логина */
module.exports = {
	/**
	 * Список ссылок
	 *
	 * @type {Object}
	 */
	links: {
		passwordRestore: 'https://e.mail.ru/password/restore/',
		signUp         : 'https://e.mail.ru/signup?from=login'
	},

	/**
	 * Провайдеры
	 *
	 * @type {Object}
	 */
	providers: {
		/**
		 * Список провайдеров (пиктограммы)
		 *
		 * @type {Array}
		 */
		buttons: [
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com'
		],

		/**
		 * Список провайдеров (селект)
		 *
		 * @type {Array}
		 */
		select: [
			'mail.ru',
			'inbox.ru',
			'bk.ru',
			'list.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com',
			'yahoo.com',
			'hotmail.com',
			'live.com',
			'msn.com'
		]
	},

	/**
	 * Учетные записи пользователей
	 *
	 * @type {Object}
	 */
	users: { }
};
