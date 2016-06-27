'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let popups = require('../../pages/compose/popups');

/** Модуль для работы с шагами контролов страницы написания письма */
class Popups extends Steps {
	constructor () {
		super();
	}

	/**
	 *
	 * Метод возвращает элемент попапа по его имени
	 * @param {string} name - имя попапа
	 * Доступные значения (missingAttach, multiAttachToCompose, secure )
	 * @returns {Promise}
	 */
	getPopup (name) {
		let popup = popups.getPopup(name);

		assert(popup.isVisible(), 'Попап не был показан');

		return popup;
	}


}

module.exports = new Popups();
