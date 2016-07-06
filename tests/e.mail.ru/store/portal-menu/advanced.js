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
	 * @type {string[]}
	 */
	static get checkboxes () {
		return ['unread', 'flag', 'attach'];
	}

	/**
	 * Список текстовых полей (кроме даты)
	 *
	 * @type {string[]}
	 */
	static get textFields () {
		return ['from', 'to', 'subject', 'message'];
	}

	/**
	 * Поля селекта разброса даты
	 *
	 * @type {*[]}
	 */
	static get dateSelectValues () {
		return [
			{
				text: 'точная дата',
				operandText: '',
				value: '0'
			},
			{
				text: '±1 день',
				operandText: '±1 день',
				value: '1'
			},
			{
				text: '±3 дня',
				operandText: '±3 дня',
				value: '3'
			},
			{
				text: '±7 дней',
				operandText: '±7 дней',
				value: '7'
			},
			{
				text: '±30 дней',
				operandText: '±30 дней',
				value: '30'
			}
		];
	}
}

module.exports = Advanced;
