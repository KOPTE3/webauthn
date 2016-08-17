'use strict';

let FilesearchPage = require('../filesearch');

/** Модуль для работы с формой страницы написания письма */
class FilesPage extends FilesearchPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = '.b-datalist_fileSearch';
		const item = '.b-datalist__item';

		const getItem = (id) => {
			let path;

			if (id) {
				path = `${container} ${item}[data-id="${id}"]`;
			} else {
				path = `${container} ${item}`;
			}

			return path;
		};

		return this.extend(super.locators, {
			container,
			item,

			getItem: (id) => {
				return getItem(id);
			},

			getCheckbox: (id) => {
				return `${getItem(id)} [data-bem="b-checkbox"]`;
			},

			getDownloadLink: (id) => {
				return `${getItem(id)} [data-name="download"]`;
			}

		});
	}

	/**
	 * Скачать самый новый файло
	 *
	 * @param {string}[id] - идентификатор файла (если не передан, то берется самый новый)
	 * @returns {boolean} - смог ли нажать на скачать
	 */
	clickDonwloadLink (id) {
		var link = this.locators.getDownloadLink(id);

		this.page.moveToObject(link);

		return this.clickWithRetry(link);
	}

	/**
	 * Метод отмечает файл
	 * @param {string}[id] - идентификатор файла (если не передан, то берется самый новый)
	 * @returns {boolean}
	 */
	selectFile (id) {
		var link = this.locators.getCheckbox(id);

		return this.clickWithRetry(link);
	}

	/**
	 * Метод кликает правой кнопкой мышке по файлу их списка
	 * @param {string} [id] - - идентификатор файла (если не передан, то берется самый новый)
	 *
	 */
	rightClickOnFile (id) {
		var link = this.locators.getItem(id);
		
		this.page.rightClick(link);
	}

}

module.exports = FilesPage;
