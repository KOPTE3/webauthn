'use strict';

let collectorProviders = require('../../store/collectors/providers');

/** Модуль для работы с данными почтовых провайдеров */
class Providers extends collectorProviders {
	constructor () {
		super();
	}

	/**
	 * Получить активный список провайдеров (пиктограммы)
	 *
	 * @type {Array}
	 */
	get active () {
		return this.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com'
		]);
	}

	/**
	 * Получить список провайдеров (селект)
	 *
	 * @type {Array}
	 */
	get select () {
		return this.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com',
			'yahoo.com',
			'hotmail.com',
			'outlook.com'
		]);
	}
}

module.exports = new Providers();
