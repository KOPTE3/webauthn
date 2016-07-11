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
		buttons: providers.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com'
		]),

		/**
		 * Список провайдеров (селект)
		 *
		 * @type {Array}
		 */
		select: providers.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com',
			'yahoo.com',
			'hotmail.com',
			'outlook.com'
		]),

		/**
		 * Список провайдеров (OAuth)
		 *
		 * @type {Array}
		 */
		get oauth () {
			providers.filter(provider => {
				return provider.types.includes('oauth');
			});
		},

		/**
		 * Список провайдеров (External)
		 *
		 * @type {Array}
		 */
		get external () {
			providers.filter(provider => {
				let { types } = provider;

				return types.includes('external') && !types.includes('oauth');
			});
		}
	},

	/**
	 * Учетные записи пользователей
	 *
	 * @type {Object}
	 */
	users: { }
};
