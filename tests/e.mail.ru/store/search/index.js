'use strict';

let authStore = require('../../store/authorization');

/** Набор методов для работы с данными поиска */
module.exports = {
	/**
	 * Письма для тестирования поиска по флажкам
	 *
	 * @return {*[]}
	 */
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

	/**
	 * Сохраненные запросы, когда был сделан 1 поиск
	 * Можно использовать для RPC.mock
	 *
	 * @return {*[]}
	 */
	get requests () {
		return [
			{
				query: 'test'
			}
		];
	},

	/**
	 * Два сохраненных запроса
	 * @see requests
	 *
	 * @return {*[]}
	 */
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

	/**
	 * Тексты в саджестах для двух сохраненных запросов
	 * @see twoRequests
	 *
	 * @return {string[]}
	 */
	get twoRequestsSuggests () {
		return [
			'От: test1@mail.ru с вложениями',
			'От: test3@mail.ru кому: test2@mail.ru с темой: test непрочитанные отмеченные флажком'
		];
	},

	/**
	 * Три сохраненных запроса
	 * @see twoRequests
	 *
	 * @return {*[]}
	 */
	get threeRequests () {
		return this.twoRequests.concat({
			flags: {
				flagged: true
			},
			subject: 'test_test'
		});
	},

	/**
	 * Тексты в саджестах для трех сохраненных запросов
	 * @see threeRequests
	 *
	 * @return {string[]}
	 */
	get threeRequestsSuggests () {
		return this.twoRequestsSuggests.concat('Тема: test_test отмеченные флажком');
	},

	/**
	 * Один большой сохраненный запрос
	 * @see twoRequests
	 *
	 * @return {*[]}
	 */
	get oneComplexRequest () {
		return this.twoRequests.filter((item, index) => index === 1);
	},

	/**
	 * Тексты в саджестах для трех сохраненных запросов
	 * @see oneComplexRequest
	 *
	 * @return {string[]}
	 */
	get oneComplexRequestSuggests () {
		return this.twoRequestsSuggests.filter((item, index) => index === 1);
	},

	/**
	 * Порядок операндов в запросе
	 * @see oneComplexRequest
	 *
	 * @return {string[]}
	 */
	get oneComplexRequestOperandsOrder () {
		return ['from', 'to', 'subject', 'unread', 'flag'];
	}
};
