'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с лаерами */
class Layers extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let locator = this.locator || '';

		return {
			container: '.alertDiv',
			head     : `${locator} .popup__box .popup__head`,
			desc     : `${locator} .popup__box .popup__desc`,
			apply    : `${locator} .popup__controls .confirm-ok`,
			cancel   : `${locator} .popup__controls .confirm-cancel`,
			close    : '.popup .js-cancel'
		};
	}

	/**
	 * Метод возвращает контенер текущего леера
	 *
	 * @returns {Promise}
	 */
	getContainer () {
		return this.page.element(this.locators.container);
	}

	/**
	 * Метод возвращает текст блока
	 *
	 * @param {string} name - имя блока
	 * @returns {Promise}
	 */
	getBlockText (name) {
		return this.page.getText(this.locators[name]);
	}

	/**
	 * Метод дожидается показа лаера
	 *
	 * Доступные значения (missingAttach, multiAttachToCompose, secure)
	 */
	wait () {
		this.page.waitForVisible(this.locators.container, 1000);
	}

	/**
	 * Метод возвращает элемент лаера по его имени
	 *
	 * @returns {Promise}
	 */
	show () {
		this.wait();

		return this.page.element(this.locators.container);
	}

	apply () {
		this.page.click(this.locators.apply);
	}

	/**
	 * Метод закрывает открытый попап
	 */
	close () {
		this.page.click(this.locators.close);
	}

	/**
	 * Метод нажимает "Принять" в леере
	 * */
	apply () {
		this.page.click(this.locators.apply);
	}

	/**
	 * Метод нажимает "Отменить" в леере
	 * */
	cancel () {
		this.page.click(this.locators.cancel);
	}

}

module.exports = Layers;
