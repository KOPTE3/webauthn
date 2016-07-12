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
	},

	get requests () {
		return [
			{
				query: 'test'
			}
		];
	},

	get twoRequests () {
		return [
			{
				flags: {
					attach: true
				},
				correspondents: {
					from: 'test1@mail.ru'
				}
			},
			{
				flags: {
					unread: true,
					flagged: true
				},
				subject: 'test',
				correspondents: {
					from: 'test3@mail.ru',
					to: 'test2@mail.ru'
				}
			}
		];
	},

	get twoRequestsSuggests () {
		return [
			'От: test1@mail.ru с вложениями',
			'От: test3@mail.ru кому: test2@mail.ru с темой: test непрочитанные отмеченные флажком'
		];
	}
};
