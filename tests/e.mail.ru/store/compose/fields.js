'use strict';

let authStore = require('../../store/authorization');

/** Набор методов для работы с данными формы страницы написания письма */
module.exports = {
	/**
	 * Возвращает список полей для отправки формы
	 *
	 * @type {Object}
	 */
	get fields () {
		let user = authStore.account.get('email');

		return {
			from    : user,
			to      : user,
			cc      : user,
			bcc     : user,
			subject : 'test',
			text    : 'testing test',
			remind  : 1,
			receipt : 1,
			priority: 1
		};
	},

	/**
	 * Возвращает список полей, которые могут быть скрыты
	 *
	 * @type {Array}
	 */
	hiddenFields: ['to', 'from', 'cc', 'bcc'],

	/**
	 * Список полей для ввода адреса
	 *
	 * @type {[]}
	 */
	correspondentsFields: ['to', 'cc', 'bcc']
};
