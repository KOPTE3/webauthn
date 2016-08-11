'use strict';

let ComposeControls = require('../compose/controls');

/** Модуль для работы с контролами страницы написания письма */
class Compose2Controls extends ComposeControls {
	constructor () {
		super();
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let toolbar = '[data-mnemo="toolbar-compose"]';

		return this.extend(super.locators, {

		});
	}
}

module.exports = Compose2Controls;
