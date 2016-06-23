'use strict';

let Store = require('../../store');

/** Модуль для работы с данными формы страницы написания письма */
class ComposeForm extends Store {
	constructor () {
		super();
	}

	/**
	 * Возвращает список полей для отправки формы
	 *
	 * @type {Object}
	 */
	get fields () {
		let user = this.account.get('email');

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
}

module.exports = ComposeForm;
