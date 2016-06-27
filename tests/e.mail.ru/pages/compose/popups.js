'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с контролами страницы написания письма */
class Popups extends PageObject {
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
		return {
			head: '.popup__box .popup__head',
			desc: '.popup__box .popup__desc',
			apply: '.popup__box .popup__controls .confirm-ok',
			cancle: '.popup__box .popup__controls .confirm-cancel',
			close: '.popup .js-cancel',
			popups: {
				missingAttach: '.is-compose-missingAttach_in',
				multiAttachToCompose: '.is-multiAttachToCompose_in',
				secure: '.is-secure_in'
			}
		};
	}

	/**
	 *
	 * Метод возвращает элемент попапа по его имени
	 * @param {string} name - имя попапа
	 * Доступные значения (missingAttach, multiAttachToCompose, secure)
	 * @returns {Promise}
	 */
	getPopup (name) {
		return browser.element(this.locators.popups[name]);
	}

	/**
	 * Метод закрывает открытый попап
	 */
	closePopup () {
		this.page.click(this.locators.close);
	}

}

module.exports = new Popups();
