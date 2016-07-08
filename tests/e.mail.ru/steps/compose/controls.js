'use strict';

let assert = require('assert');

let ComposeSteps = require('../compose');
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
	 * Сохранить шаблон
	 */
	template () {
		this.composeControls.openSaveDropdown();
		this.composeControls.template();
	}

	/**
	 * Отправить сообщение
	 */
	send () {
		this.composeControls.send();
	}

	/*
	 * Отменить письмо
	 * */
	cancel () {
		this.composeControls.cancel();
	}
	
	applyTemplate () {
		this.composeControls.applyTemplate();
	}
}

module.exports = new ComposeControlSteps();
