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
		let layerName = this.name || '';

		return {
			container: '.alertDiv',
			head     : `${layerName} .popup__box .popup__head`,
			desc     : `${layerName} .popup__box .popup__desc`,
			apply    : `${layerName} .popup__controls .confirm-ok`,
			cancel   : `${layerName} .popup__controls .confirm-cancel`,
			close    : '.popup .js-cancel'
		};
	}

	/**
	 * Метод возвращает контенер текущего леера
	 * @returns {Promise}
	 * */
	getContainer () {
		return this.page.element(this.locators.container);
	}

	/**
	 * Метод возвращает текст блока
	 * @param {string} name - имя блока
	 * @returns {Promise}
	 * */
	getText (name) {
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

	/**
	 * Метод закрывает открытый попап
	 */
	close () {
		this.page.click(this.locators.close);
	}
}

module.exports = Layers;
