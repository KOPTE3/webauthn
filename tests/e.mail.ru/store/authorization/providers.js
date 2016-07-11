'use strict';

/** Набор методов для работы с данными почтовых провайдеров */
module.exports = {
	/**
	 * Список провайдеров
	 *
	 * @returns {Array}
	 */
	list: [
		{
			name: 'mail.ru',
			types: ['internal', 'oauth'],
			hosts: [
				'mail.ru',
				'mail.ua',
				'inbox.ru',
				'list.ru',
				'bk.ru'
			]
		},

		{
			name: 'yandex.ru',
			types: ['external'],
			hosts: [
				'yandex.ru',
				'yandex.com',
				'yandex.ua',
				'yandex.kz',
				'yandex.by',
				'narod.ru',
				'ya.ru',
				'ya.com'
			]
		},

		{
			name: 'rambler.ru',
			types: ['external'],
			hosts: [
				'rambler.ru',
				'lenta.ru',
				'myrambler.ru',
				'autorambler.ru',
				'ro.ru',
				'r0.ru'
			]
		},

		{
			name: 'gmail.com',
			types: ['external', 'oauth'],
			hosts: [
				'gmail.com'
			]
		},

		{
			name: 'aol.com',
			types: ['external'],
			hosts: [
				'aol.com'
			]
		},

		{
			name: 'icloud.com',
			types: ['external'],
			hosts: [
				'icloud.com',
				'me.com'
			]
		},

		{
			name: 'qq.com',
			types: ['external'],
			hosts: [
				'qq.com'
			]
		},

		{
			name: 'my.com',
			types: ['external'],
			hosts: [
				'my.com'
			]
		},

		{
			name: 'yahoo.com',
			types: ['external'],
			hosts: [
				'yahoo.com',
				'ymail.com',
				'rocketmail.com',
				'yahoo.com.ar',
				'yahoo.com.au',
				'yahoo.at',
				'yahoo.be',
				'yahoo.fr',
				'yahoo.nl',
				'yahoo.com.br',
				'yahoo.ca',
				'yahoo.en',
				'yahoo.com.cn',
				'yahoo.cn',
				'yahoo.com.co',
				'yahoo.cz',
				'yahoo.dk',
				'yahoo.fi',
				'yahoo.de',
				'yahoo.gr',
				'yahoo.com.hk',
				'yahoo.fi',
				'yahoo.de',
				'yahoo.gr',
				'yahoo.com.hk',
				'yahoo.hu',
				'yahoo.co.in',
				'yahoo.in',
				'yahoo.co.id',
				'yahoo.ie',
				'yahoo.co.il',
				'yahoo.it',
				'yahoo.co.jp',
				'yahoo.co.kr',
				'yahoo.com.my',
				'yahoo.com.mx',
				'yahoo.ae',
				'yahoo.nl',
				'yahoo.co.nz',
				'yahoo.no',
				'yahoo.com.ph',
				'yahoo.pl',
				'yahoo.pt',
				'yahoo.ro',
				'yahoo.ru',
				'yahoo.com.sg',
				'yahoo.co.za',
				'yahoo.es',
				'yahoo.se',
				'yahoo.ch',
				'yahoo.com.tw',
				'yahoo.co.th',
				'yahoo.com.tr',
				'yahoo.co.uk',
				'yahoo.com',
				'yahoo.com.vn'
			]
		},

		{
			name: 'qip.ru',
			types: ['external'],
			hosts: [
				'qip.ru',
				'pochta.ru',
				'fromru.com',
				'front.ru',
				'hotbox.ru',
				'hotmail.ru',
				'krovatka.su',
				'land.ru',
				'mail15.com',
				'mail333.com',
				'newmail.ru',
				'nightmail.ru',
				'nm.ru',
				'pisem.net',
				'pochtamt.ru',
				'pop3.ru',
				'rbcmail.ru',
				'smtp.ru',
				'5ballov.ru',
				'aeterna.ru',
				'ziza.ru',
				'memori.ru',
				'photofile.ru',
				'fotoplenka.ru',
				'pochta.com'
			]
		},

		{
			name: 'outlook.com',
			types: ['external', 'oauth'],
			hosts: [
				'outlook.com',
				'hotmail.com',
				'msn.com',
				'live.com',
				'live.ru'
			]
		}
	],

	/**
	 * Добаавляет список провайдеров
	 *
	 * @param {...Array} providers — список провайдеров
	 */
	set (...providers) {
		this.list.push(...providers);
	},

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
	},

	/**
	 * Поиск провайдера по имени домена или email
	 *
	 * @param {string} domain
	 * @returns {string|undefined}
	 */
	find (domain) {
		let provider = this.list.find(provider => {
			for (let alias of provider.hosts) {
				if (alias === domain) {
					return true;
				}
			}
		});

		return provider && provider.name;
	},

	/**
	 * Фильтр провайдеров по заданному предикату
	 *
	 * @param {Function} predicate
	 * @returns {Array}
	 */
	filter (predicate) {
		return this.list.filter(provider => {
			return predicate(provider);
		});
	},

	/**
	 * Проектный топ провайдеров по типам авторизации
	 *
	 * @see http://mail-dashboard.mail.ru/?id=ext-rimap-daily
	 * @see http://mail-dashboard.mail.ru/?id=instant-rimap-daily
	 * @see https://jira.mail.ru/browse/MNT-113559
	 * @see https://jira.mail.ru/browse/MNT-113560
	 * @param {string} type — [ external | collectors | pdd ]
	 * @param {string} [project]
	 * @returns {Array}
	 */
	top (type, project = 'mail.ru') {
		let providers = {
			external: {
				'my.com': [
					'gmail.com',
					'hotmail.com',
					'libero.it',
					'yahoo.com',
					'outlook.com',
					'mail.ru'
				],

				'mail.ru': [
					'gmail.com',
					'rambler.ru',
					'outlook.com',
					'hotmail.com',
					'msn.com',
					'qip.ru',
					'ya.ru',
					'yandex.ru',
					'yandex.ua',
					'yahoo.com',
					'mail.ru'
				]
			}
		};

		try {
			return providers[type][project];
		} catch (error) {
			return [];
		}
	}
};
