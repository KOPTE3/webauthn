'use strict';

let assert = require('assert');
let Pages = require('../pages');

class Steps extends Pages {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @param {string} name
	 */
	static addFeature (name) {
		let pages = new Pages();

		pages.addFeature(name);
	}

	/**
	 * Дождаться появления требуемного элемента
	 */
	/*
	wait () {
		let actual = super.wait();

		assert(actual, `Не удалось дождаться появления элемента ${
			this.locators.container}`);
	}
	*/
}

module.exports = Steps;
