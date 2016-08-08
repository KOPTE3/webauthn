'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class multiAttach extends Layers {
	constructor () {
		super();
		this.locator = '//div[contains(@class, "b-explorer")]/../..';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = this.locator;
		const body = '.b-explorer';
		const form = `${body} .b-explorer__block_bottom`;

		return this.extend(super.locators, {
			container,
			head     : `${body} .b-explorer__block_top`,
			desc     : `${body} .b-explorer__block_top`,
			apply    : `${container}//button[@data-id="popup_ok"]`,
			cancel   : `${container}//button[@data-id="popup_cancel"]`,
			close    : `${container}//button[@data-id="popup_cancel"]`,
			filelabel: `${body} [data-id="filelabel"]`,
			form: {
				container: form,
				cloudfile: (filename) => `${form} [data-id="/${filename}"]`,
				mail: `${form} .b-tree[data-id="mail"] .js-href[data-id="-1"]`,
				files: `${form} .b-thumb`,
				filename: '.b-filename__name'
			}
		});
	}

	/**
	 * Кликнуть на файл. Предполагается что файл лежит в корне облака
	 * @param {string} filename
	 */
	toggleCloudFile (filename) {
		this.page.click(this.locators.form.cloudfile(filename));
	}

	/**
	 * Кликнуть на почтофайл. Предполагается что файл лежит в корне облака
	 * @param {string} filename
	 */
	toggleMailFile (filename) {
		let { value: files } = this.page.elements(this.locators.form.files);

		files.some(({ ELEMENT }) => {
			let name = this.page.elementIdElement(ELEMENT, this.locators.form.filename);

			if (name.getText() === filename) {
				this.page.elementIdClick(ELEMENT);

				return true;
			}
		});
	}

	/**
	 * Выбрать раздел почтофайлов
	 */
	clickMail () {
		this.page.click(this.locators.form.mail);
	}

	/**
	 * Переключить в режим списка
	 */
	clickListView () {
		this.page.click(this.locators.filelabel);
	}
}

module.exports = multiAttach;
