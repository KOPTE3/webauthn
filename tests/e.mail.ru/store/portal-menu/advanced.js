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
	 * @type {Array}
	 */
	static get checkboxes () {
		return ['unread', 'flag', 'attach'];
	}

	/**
	 * Список текстовых полей (кроме даты)
	 *
	 * @type {Array}
	 */
	static get textFields () {
		return ['from', 'to', 'subject', 'message'];
	}
}

module.exports = Advanced;
