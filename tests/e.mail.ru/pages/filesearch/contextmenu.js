'use strict';

let FilesearchPage = require('../filesearch');

/** Модуль для работы с формой страницы написания письма */
class ToolbarPage extends FilesearchPage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		const container = '[data-mnemo="fileSearch_contextmenu"]';

		return this.extend(super.locators, {
			container,
			buttons: {
				download: `${container} [data-name="download"]`
			}
		});
	}

	/**
	 * Метод кликает по кнопке в тулбаре
	 * @param {string} name - имя кнопки (download)
	 */
	clickButton (name) {
		this.clickWithRetry(this.locators.buttons[name]);
	}

}

module.exports = ToolbarPage;
