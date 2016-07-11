'use strict';

let authStore = require('../../store/authorization');

/** Набор методов для работы с данными поиска */
module.exports = {
	get messages () {
		let user = authStore.account.get('email');

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
};
