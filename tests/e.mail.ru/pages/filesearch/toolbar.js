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
		const container = '[data-mnemo="toolbar-fileSearch"]';
		const menubar = '[role="menubar"]';

		return this.extend(super.locators, {
			container,
			stateMenu: {
				active: `${container} ${menubar} .btn_active`,
				getButton: (type) => {
					return `${container} ${menubar} [data-name=${type}]`;
				}
			},
			buttons: {
				download: `${container} [data-name="download"]`
			}
		});
	}

	/**
	 * Метод возвращает активное состояние списка
	 * @returns {string} - list или thumbs
	 */
	getActiveState () {
		return this.page.getAttribute(this.locators.stateMenu.active, 'data-name')[0];
	}

	/**
	 * Метод меняет состояние списка (лист, тамбы)
	 * @param {string} state - на что поменять (list, thumbs)
	 */
	changeState (state) {

		if (this.getActiveState() === state) {
			return;
		}

		this.clickWithRetry(this.locators.stateMenu.getButton(state));
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
