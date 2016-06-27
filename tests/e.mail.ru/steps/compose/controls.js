'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let controls = require('../../pages/compose/controls');

/** Модуль для работы с шагами контролов страницы написания письма */
class Controls extends Steps {
	constructor () {
		super();
	}

	/**
	 * Сохранить черновик
	 */
	draft () {
		controls.draft();
	}

	/**
	 * Отправить сообщение
	 */
	compose () {
		controls.compose();
	}

}

module.exports = new Controls();
