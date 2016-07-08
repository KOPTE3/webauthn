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
		return {
			container: '.b-thread'
		};
	}
}

module.exports = Thread;
