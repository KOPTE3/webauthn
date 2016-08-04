'use strict';

let ComposeEditor = require('../compose/editor');

/** Модуль для работы с редактором страницы написания письма */
class Compose2Editor extends ComposeEditor {
	constructor () {
		super();
	}

	/**
	 * Дождаться открытия редактора
	 *
	 * @returns {boolean}
	 */
	wait () {
		// TODO: редактор может быть невидим на новом композе, возможно нужно waitForExist
		this.page.waitForVisible(this.locators.container);

		return this.page.isVisible(this.locators.container);
	}
}

module.exports = Compose2Editor;
