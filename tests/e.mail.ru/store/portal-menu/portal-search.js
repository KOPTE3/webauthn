'use strict';

let Store = require('../../store');

/** Модуль для работы с даными поиска в синей шапке */
class PortalSearch extends Store {
	constructor () {
		super();
	}

	/**
	 * Все операнды
	 *
	 * @return {*[]}
	 * @private
	 */
	static get operands () {
		return [
			{
				name: 'message',
				texteditable: true,
				selectable: true
			},
			{
				name: 'from',
				texteditable: true,
				selectable: true
			},
			{
				name: 'to',
				texteditable: true,
				selectable: true
			},
			{
				name: 'subject',
				texteditable: true,
				selectable: true
			},
			{
				name: 'unread',
				texteditable: false,
				selectable: false
			},
			{
				name: 'flag',
				texteditable: false,
				selectable: false
			},
			{
				name: 'attach',
				texteditable: false,
				selectable: false
			},
			{
				name: 'date',
				texteditable: false,
				selectable: true
			},
			{
				name: 'blank',
				texteditable: true,
				selectable: true,
				nosubmit: true
			}
		];
	}

	/**
	 * Получить имена операндов-флажков
	 *
	 * @return {string[]}
	 */
	static get flagOperands () {
		return this.operands
			.filter(item => !item.selectable)
			.map(item => item.name);
	}
}

module.exports = PortalSearch;
