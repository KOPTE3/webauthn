'use strict';

let Layers = require('../../pages/layers');

/** Модуль для работы с лером прикрепления аттачей */
class multiAttach extends Layers {
	constructor () {
		super();
		this.locator = '//div[contains(@class, "b-explorer_cloud")]/../..';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = this.locator;
		const body = '.b-explorer_cloud';
		const form = `${body} .b-explorer__block_bottom`;

		return this.extend(super.locators, {
			container,
			head     : `${body} .b-explorer__block_top`,
			desc     : `${body} .b-explorer__block_top`,
			apply    : `${container}//button[@data-id="popup_ok"]`,
			cancel   : `${container}//button[@data-id="popup_cancel"]`,
			close    : `${container}//button[@data-id="popup_cancel"]`,
			form: {
				container: form,
				file: (filename) => `${form} [data-id="/${filename}"]`
			}
		});
	}

	/**
	 * Кликнуть на файл. Предполагается что файл лежит в корне облака
	 * @param {string} filename
	 */
	toggleCloudFile (filename) {
		this.page.click(this.locators.form.file(filename));
	}
}

module.exports = multiAttach;
