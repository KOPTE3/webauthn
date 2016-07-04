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

	/**
	 * Список текстовых полей (кроме даты)
	 *
	 * @return {string[]}
	 */
	static get textFields () {
		return ['from', 'to', 'subject', 'message'];
	}
}

module.exports = Advanced;
