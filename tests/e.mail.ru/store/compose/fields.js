'use strict';

let Store = require('../../store');

/** Модуль для работы с данными формы страницы написания письма */
class ComposeFields extends Store {
	constructor () {
		super();
	}

	/**
	 * Возвращает список полей для отправки формы
	 *
	 * @type {Object}
	 */
	get fields () {
		let user = `${this.account.get('login')}@${this.account.get('domain')}`;

		return {
			from    : user,
			to      : user,
			cc      : user,
			bcc     : user,
			subject : 'test',
			remind  : 1,
			receipt : 1,
			priority: 1
		};
	}

	/**
	 * Возвращает список полей, которые могут быть скрыты
	 *
	 * @type {Array}
	 */
	static get hiddenFields () {
		return ['to', 'from', 'cc', 'bcc'];
	}
}

module.exports = ComposeFields;
