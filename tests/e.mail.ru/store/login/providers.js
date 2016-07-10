'use strict';

let providers = require('../../store/authorization/providers');

/** Набор методов для работы с данными почтовых провайдеров на странице логина */
module.exports = {
	/**
	 * Получить активный список провайдеров (пиктограммы)
	 *
	 * @type {Array}
	 */
	active: providers.get([
		'mail.ru',
		'yandex.ru',
		'rambler.ru',
		'gmail.com'
	]),

	/**
	 * Получить список провайдеров (селект)
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
	])
};
