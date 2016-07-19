'use strict';

/** Набор пользовательских данных */
module.exports = {
	/**
	 * Список учетных записей
	 *
	 * ВНИМАНИЕ: Данные учетные записи разрешается использтвать только
	 * в тестах, которые не изменяют состояние аккаунта (например, авторизация)
	 * Во всех остальных случаях — используейте store/authorization.credentials
	 *
	 * @returns {Array}
	 */
	list: [
		{
			provider: 'mail.ru',
			features: ['basic', 'oauth'],
			username: 'jelza.lezhdej@mail.ru',
			password: 'KqFyxBq74oOx'
		},

		{
			provider: 'mail.ua',
			features: ['basic', 'oauth'],
			username: 'austen_jane@mail.ua',
			password: 'dfgrty35t6'
		},

		{
			provider: 'inbox.ru',
			features: ['basic', 'oauth'],
			username: 'toropova.1964@inbox.ru',
			password: 'yHACdyYPzWq5'
		},

		{
			provider: 'mail.ru',
			features: ['basic', 'oauth'],
			username: 'jelza.lezhdej@mail.ru',
			password: 'KqFyxBq74oOx'
		},

		{
			provider: 'list.ru',
			features: ['basic', 'oauth'],
			username: 'hohlov.2017@list.ru',
			password: 'RxhhJq3fgQoa'
		},

		{
			provider: 'bk.ru',
			features: ['basic', 'oauth'],
			username: 'jaromirp@bk.ru',
			password: 'z84c24f3ag'
		},

		{
			provider: 'rambler.ru',
			features: ['external'],
			username: 'rb.collector9@rambler.ru',
			password: 'kOVZ7F2CuO'
		},

		{
			provider: 'gmail.com',
			features: ['external', 'oauth'],
			username: 'gml.collector8@gmail.com',
			password: 'KqFyxBq74oOx'
		},

		{
			provider: 'aol.com',
			features: ['internal', 'oauth'],
			username: 'ivanovchenko@aol.com',
			password: '6x518ww20s'
		},

		{
			provider: 'yandex.ru',
			features: ['external'],
			username: 'authtest@yandex.ru',
			password: 'AeK6FoKfnr'
		},

		{
			provider: 'yahoo.com',
			features: ['external'],
			username: 'authtest4@yahoo.com',
			password: '6Uyu4lCJQa'
		},

		{
			provider: 'qip.ru',
			features: ['external'],
			username: 'q.collector7@qip.ru',
			password: 'mB9pkb0B5n'
		},

		{
			provider: 'outlook.com',
			features: ['external', 'oauth'],
			username: 'out.collector3@outlook.com',
			password: 'NkIPDXKBHW'
		}
	],

	/**
	 * Получает учетную запись с заданными характеристиками
	 *
	 * @param {string} domain
	 * @param {Array} [features]
	 * @returns {Object|undefined}
	 */
	get (domain, features = []) {
		return this.list.find(account => {
			if (domain) {
				let filtered = features.every(feature => {
					return account.features.includes(feature);
				});

				if (account.provider === domain) {
					return account;
				}
			}
		});
	}
};
