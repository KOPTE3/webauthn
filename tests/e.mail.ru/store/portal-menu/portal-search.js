'use strict';

/** Набор методов для работы с даными поиска в синей шапке */
module.exports = {
	/**
	 * Все операнды
	 *
	 * @type {*[]}
	 */
	operands: [
		{
			name: 'message',
			fieldName: 'q_query',
			texteditable: true,
			selectable: true
		},
		{
			name: 'from',
			fieldName: 'q_from',
			texteditable: true,
			selectable: true
		},
		{
			name: 'to',
			fieldName: 'q_to',
			texteditable: true,
			selectable: true
		},
		{
			name: 'subject',
			fieldName: 'q_subj',
			texteditable: true,
			selectable: true
		},
		{
			name: 'unread',
			fieldName: 'q_read',
			texteditable: false,
			selectable: false
		},
		{
			name: 'flag',
			fieldName: 'q_flag',
			texteditable: false,
			selectable: false
		},
		{
			name: 'attach',
			fieldName: 'q_attach',
			texteditable: false,
			selectable: false
		},
		{
			name: 'date',
			fieldName: 'q_date',
			texteditable: false,
			selectable: true
		},
		{
			name: 'blank',
			fieldName: 'blank',
			texteditable: true,
			selectable: true,
			nosubmit: true
		}
	],

	/**
	 * Получить имена операндов-флажков
	 *
	 * @type {string[]}
	 */
	get flagOperands () {
		return this.operands
			.filter(item => !item.selectable)
			.map(item => item.name);
	},

	/**
	 * Соответствие имен полей и имен операндов
	 *
	 * @type {Object}
	 */
	get fieldNames () {
		let result = {};

		this.operands.forEach(({name, fieldName}) => {
			result[fieldName] = name;
		});

		return result;
	}
};
