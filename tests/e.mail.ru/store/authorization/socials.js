'use strict';

/** Набор методов для работы с данными социальных сервисов */
module.exports = {
	/**
	 * Список провайдеров
	 *
	 * @returns {Array}
	 */
	list: [
		{
			name: 'vk.com',
			types: ['social', 'external', 'oauth'],
			hosts: [
				'vk.com'
			],
			url: 'https://oauth.vk.com/authorize'
		},

		{
			name: 'ok.ru',
			types: ['social', 'external', 'oauth'],
			hosts: [
				'ok.ru'
			],
			url: 'https://connect.ok.ru/dk'
		},

		{
			name: 'fb.com',
			types: ['social', 'external', 'oauth'],
			hosts: [
				'fb.ru', 'facebook.com'
			],
			url: 'https://www.facebook.com/login.php'
		}


	],

	/**
	 * Возвращает список провайдеров
	 *
	 * @param {Array|null} providers — заданный список провайдеров
	 * @returns {Array}
	 */
	get (providers) {
		if (providers) {
			return this.list.filter(provider => {
				if (providers.includes(provider.name)) {
					return provider;
				}
			});
		}

		return this.list;
	}
};
