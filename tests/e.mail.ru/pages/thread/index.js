'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением треда */
class Thread extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/thread';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = '#thread';

		return {
			container,
			letters: `${container} [data-letter-id]`
		};
	}

	/**
	 * Получить все письма из треда
	 *
	 * @return {*}
	 */
	getLetters () {
		return this.page.elements(this.locators.letters);
	}

	/**
	 * Получить количество писем в треде
	 *
	 * @return {number}
	 */
	getLettersCount () {
		let { value } = this.getLetters();

		return value.length;

	}

	/**
	 * Возвращает состояние развернутости
	 *
	 * @param {number} index порядковый номер письма в треде
	 *
	 * @returns {boolean} true если письмо развернуто
	 */
	getExpandedStatus (index) {
		let { value } = this.getLetters();
		let className = this.page.elementIdAttribute(value[index].ELEMENT,'class').value;

		return className.includes('b-letter_expanded');
	}
}

module.exports = Thread;
