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
	send () {
		controls.send();
	}

	/*
	 * Отменить письмо
	 * */
	cancel () {
		controls.cancel();
	}
}

module.exports = new Controls();
