'use strict';

module.exports = {
	/**
	 * Идентификаторы папок.
	 */
	ids: {
		'root': '-1',
		'inbox': '0',
		'sent': '500000',
		'trash': '500002',
		'social': '500011',
		'promotions': '500012',
		'newsletters': '500013'
	},

	/**
	 * Компактные фильтры
	 */
	filters: [
		{ name: 'unread', title: 'Непрочитанные' },
		{ name: 'flag', title: 'Отмеченные флажком' },
		{ name: 'attach', title: 'С вложениями' }
	]
};
