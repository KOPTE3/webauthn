'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let ThreadPage = require('../../pages/thread');

/** Модуль для работы с шагами страницы треда */
class ThreadSteps extends Steps {
	constructor () {
		super();

		this.threadPage = new ThreadPage();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new ThreadPage();
	}

	/**
	 * Сравнить число писем в треде
	 *
	 * @param {number} count
	 */
	checkLettersCount (count) {
		let actual = this.threadPage.getLettersCount();

		assert(actual === count, `Число писем не равно ${count}`);
	}

	/**
	 * Свернуто или развернуто письмо с индексом
	 *
	 * @param {number} index порядковый номер письма в треде
	 * @param {boolean} value если true то должно быть развернуто
	 */
	checkExpandedLetter (index, value) {
		let state = this.threadPage.getExpandedStatus(index);
		let stateName = value ? 'развернуто' : 'свернуто';

		assert(state === value, `У письма не совпадает состояние развернутости. `
			+ `Письмо должно быть ${stateName}`);
	}

	waitForUrl () {
		var actual = this.threadPage.waitForUrl();

		assert(actual, `Не найдено соответствие с ожидаемым адресом ${this.threadPage.location}`);
	}
}

module.exports = ThreadSteps;
