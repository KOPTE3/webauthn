'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let MessagesPage = require('../../pages/messages');

/** Модуль для работы с шагами страницы списка писем */
class Messages extends Steps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new ComposePage();
	}

	/**
	 *
	 * @static
	 * */
	static toCompose () {
		this.page.clickButton('compose');
	}

}

module.exports = Messages;
