'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с контролами страницы написания письма */
class Controls extends PageObject {
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
		let toolbar =
			'#LEGO>div:not([style *= "hidden"]) div:not([style *= "none"])>' +
			'div[data-uniqid]:not([style *= "none"])>.b-toolbar[data-mnemo]';

		return {
			container: toolbar,
			draft    : `${toolbar} [data-name="saveDraft"]`,
			cancel   : `${toolbar} [data-name="cancel"]`,
			template : `${toolbar} [data-name="saveTemplate"]`,
			send     : `${toolbar} [data-name="send"]`
		};
	}

	/**
	 * Сохранить черновик
	 */
	draft () {
		this.page.click(this.locators.draft);
	}

	/**
	 * Написать письмо
	 */
	send () {
		this.page.click(this.locators.send);
	}

}

module.exports = new Controls();
