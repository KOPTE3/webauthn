'use strict';

let Store = require('../../store');
let AuthStore = require('../../store/authorization');

/** Модуль для работы с данными формы страницы написания письма */
class ComposeFields extends Store {
	constructor () {
		super();

		this.authStore = new AuthStore();
	}

	/**
	 * Возвращает список полей для отправки формы
	 *
	 * @type {Object}
	 */
	get fields () {
		let user = this.authStore.account.get('email');

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
