'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением страницы поиска файлов */
class FileSearchPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/filesearch';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-datalist_fileSearch',

			folders: new Proxy({}, {
				get (target, id) {
					return `.b-nav_fileSearch .b-nav__item[data-id="${id}"]`;
				}
			}),

			empty: '.b-datalist__empty'
		};
	}

	/**
	 * Выбрать заданную папку
	 *
	 * @param {number} id
	 */
	goToFolder (id) {
		this.page.click(this.locators.folders[id]);
	}

	/**
	 * Возвращает состояние папки
	 *
	 * @returns {boolean}
	 */
	isEmptyFolder () {
		return this.page.isVisible(this.locators.empty);
	}
}

module.exports = FileSearchPage;
