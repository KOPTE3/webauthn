'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы написания письма */
class ComposePage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/compose';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '#b-compose'
		};
	}
}

module.exports = ComposePage;
