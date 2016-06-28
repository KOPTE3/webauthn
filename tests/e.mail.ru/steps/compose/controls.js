'use strict';

let assert = require('assert');

let ComposeSteps = require('../../steps/compose');
let ComposeControls = require('../../pages/compose/controls');

/** Модуль для работы с шагами контролов страницы написания письма */
class ComposeControlSteps extends ComposeSteps {
	constructor () {
		super();

		this.composeControls = new ComposeControls();
	}

	/**
	 * Сохранить черновик
	 */
	draft () {
		this.composeControls.draft();
	}

	/**
	 * Отправить сообщение
	 */
	send () {
		this.composeControls.send();
	}

}

module.exports = new ComposeControlSteps();
