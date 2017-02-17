'use strict';

interface Products {
	[name: string]: Yoda.Product;
}

/** Набор методов для работы с данными */
export default {
	/**
	 * Список основных продуктов
	 *
	 * @type {Object}
	 */
	products: <Products>{
		'mail.ru': {
			name: 'Mail.Ru',
			host: 'https://mail.ru'
		},

		'biz.mail.ru': {
			name: 'Почта для бизнеса',
			host: 'https://biz.mail.ru'
		},

		'cloud.mail.ru': {
			name: 'Облако Mail.Ru',
			host: 'https://cloud.mail.ru'
		},

		'calendar.mail.ru': {
			name: 'Календарь Mail.Ru',
			host: 'https://calendar.mail.ru'
		},

		'e.mail.ru': {
			name: 'Почта Mail.Ru',
			host: 'https://e.mail.ru'
		}
	},

	/**
	 * Получить данные о продукте
	 *
	 * @param {string} name
	 * @returns {Object}
	 */
	product (name: string): Yoda.Product {
		return this.products[name];
	}
};