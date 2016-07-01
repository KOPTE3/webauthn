'use strict';

let Store = require('../../store');

/** Модуль для работы с данными расширенного поиска */
class Advanced extends Store {
	constructor () {
		super();
	}

	/**
	 * Список чекбоксов
	 *
	 * @return {string[]}
	 */
	static get checkboxes () {
		return ['unread', 'flag', 'attach'];
	}
}

module.exports = Advanced;
