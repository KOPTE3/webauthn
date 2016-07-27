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
			features: ['internal', 'oauth'],
			username: 'jelza.lezhdej@mail.ru',
			password: 'KqFyxBq74oOx'
		},

		{
			provider: 'testmail.3proxy.ru',
			features: ['external', 'pdd'],
			username: 'user-1@testmail.3proxy.ru',
			password: 'eA]7i1aUXVhn'
		},

		{
			provider: 'mail.ua',
			features: ['internal', 'oauth'],
			username: 'austen_jane@mail.ua',
			password: 'dfgrty35t6'
		},

		{
			provider: 'inbox.ru',
			features: ['internal', 'oauth'],
			username: 'toropova.1964@inbox.ru',
			password: 'yHACdyYPzWq5'
		},

		{
			provider: 'inbox.ru',
			features: ['internal', 'oauth', 'phone_verified'],
			username: 'regtest_29_06_2016_15_33_58_48@inbox.ru',
			password: '6x518ww20s'
		},

		{
			provider: 'mail.ru',
			features: ['internal', 'oauth'],
			username: 'jelza.lezhdej@mail.ru',
			password: 'KqFyxBq74oOx'
		},

		{
			provider: 'list.ru',
			features: ['internal', 'oauth'],
			username: 'hohlov.2017@list.ru',
			password: 'RxhhJq3fgQoa'
		},

		{
			provider: 'bk.ru',
			features: ['internal', 'oauth'],
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
			username: 'gml.collector10@gmail.com',
			password: 'u28D23GtIG'
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
		},

		{
			provider: 'msn.com',
			features: ['external', 'oauth'],
			username: 'out.collector3@outlook.com',
			password: 'NkIPDXKBHW'
		},

		{
			provider: 'live.com',
			features: ['external', 'oauth'],
			username: 'out.collector3@outlook.com',
			password: 'NkIPDXKBHW'
		},

		{
			provider: 'live.ru',
			features: ['external', 'oauth'],
			username: 'out.collector3@outlook.com',
			password: 'NkIPDXKBHW'
		},

		{
			provider: 'hotmail.com',
			features: ['external', 'oauth'],
			username: 'out.collector3@outlook.com',
			password: 'NkIPDXKBHW'
		}
	],

	/**
	 * Получает учетную запись с заданными характеристиками
	 *
	 * @property {string} provider
	 * @property {Array} features
	 * @returns {Object|undefined}
	 */
	get ({ provider, features = [] }) {
		return this.list.find(account => {
			let filtered = features.every(feature => {
				return account.features.includes(feature);
			});

			if (provider) {
				if (account.provider === provider && (!features.length || filtered)) {
					return account;
				}
			} else if (filtered) {
				return account;
			}
		});
	}
};
