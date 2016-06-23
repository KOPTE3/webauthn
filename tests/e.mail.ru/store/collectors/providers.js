'use strict';

let Store = require('../../store');

/** Модуль для работы с данными почтовых провайдеров */
class Providers extends Store {
	constructor () {
		super();

		/**
		 * Список провайдеров
		 *
		 * @property
		 * @returns {Array}
		 */
		this.list = [
			{
				name: 'mail.ru',
				type: 'internal',
				data: [
					'mail.ru',
					'mail.ua',
					'inbox.ru',
					'list.ru',
					'bk.ru'
				]
			},

			{
				name: 'yandex.ru',
				type: 'external',
				data: [
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
				type: 'external',
				data: [
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
				type: 'external',
				data: [
					'gmail.com'
				]
			},

			{
				name: 'aol.com',
				type: 'external',
				data: [
					'aol.com'
				]
			},

			{
				name: 'icloud.com',
				type: 'external',
				data: [
					'icloud.com',
					'me.com'
				]
			},

			{
				name: 'qq.com',
				type: 'external',
				data: [
					'qq.com'
				]
			},

			{
				name: 'my.com',
				type: 'external',
				data: [
					'my.com'
				]
			},

			{
				name: 'yahoo.com',
				type: 'external',
				data: [
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
				type: 'external',
				data: [
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
				type: 'external',
				data: [
					'outlook.com',
					'hotmail.com',
					'msn.com',
					'live.com',
					'live.ru'
				]
			}
		]
	}

	/**
	 * Добаавляет список провайдеров
	 *
	 * @param {...Array} providers — список провайдеров
	 */
	set (...providers) {
		this.list.push(...providers)
	}

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
}

module.exports = Providers;
