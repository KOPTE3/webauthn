'use strict';

let Store = require('../../store');

/** Модуль для работы с данными формы написания письма */
class ComposeForm extends Store {
	constructor () {
		super();
	}

	get fields () {
		return {
			from    : this.account.get('email'),
			to      : '',
			cc      : '',
			bcc     : '',
			subject : '',
			remind  : '',
			receipt : '',
			priority: ''
		};
	}
}

module.exports = ComposeForm;
