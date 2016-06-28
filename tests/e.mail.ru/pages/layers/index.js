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
		return {
			container: '.alertDiv',
			head     : '.popup__box .popup__head',
			desc     : '.popup__box .popup__desc',
			apply    : '.popup__box .popup__controls .confirm-ok',
			cancel   : '.popup__box .popup__controls .confirm-cancel',
			close    : '.popup .js-cancel'
		};
	}

	/**
	 * Метод дожидается показа лаера
	 *
	 * Доступные значения (missingAttach, multiAttachToCompose, secure)
	 */
	wait () {
		console.log('---', this.locators.container);

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

	/**
	 * Метод закрывает открытый попап
	 */
	close () {
		this.page.click(this.locators.close);
	}
}

module.exports = Layers;
