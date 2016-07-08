'use strict';

let AuthProviders = require('../../store/authorization/providers');

/** Модуль для работы с данными почтовых провайдеров на странице логина */
class Providers extends AuthProviders {
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

module.exports = Providers;
