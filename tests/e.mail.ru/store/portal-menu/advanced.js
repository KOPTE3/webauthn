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
	 * @returns {string[]}
	 */
	static get checkboxes () {
		return ['unread', 'flag', 'attach'];
	}

	/**
	 * Список текстовых полей (кроме даты)
	 *
	 * @returns {string[]}
	 */
	static get textFields () {
		return ['from', 'to', 'subject', 'message'];
	}
}

module.exports = Advanced;
