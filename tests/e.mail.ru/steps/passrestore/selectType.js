'use strict';

let assert = require('assert');

let Steps = require('../../steps');
let selectTypeView = require('../../pages/passrestore/selectType');

/** Модуль для работы с формой ввода адреса для восстановления */
class Controls extends Steps {
	constructor () {
		super();
	}

	/**
	 * Wait for phone tab
	 */
	waitForPhone () {
		selectTypeView.waitForPhone();
	}

	/**
	 * Crack phone captch
	 */
	fillPhoneCaptcha () {
		selectTypeView.fillPhoneCaptcha();
	}
}

module.exports = new Controls();
