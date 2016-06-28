'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением списка тредов */
class Threads extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/threads';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-threads'
		};
	}
}

module.exports = new Threads();
