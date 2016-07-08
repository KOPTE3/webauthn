'use strict';

let Store = require('../../store');
let AuthStore = require('../../store/authorization');

/** Модуль для работы с данными поиска */
class Search extends Store {
	constructor () {
		super();

		this.authStore = new AuthStore();
	}

	get messages () {
		let user = this.authStore.account.get('email');

		return [
			{
				from: user,
				to: user,
				text: '',
				subject: 'Тема1'
			},
			{
				from: user,
				to: user,
				text: '',
				subject: 'Тема2'
			}
		];
	}
}

module.exports = Search;
