'use strict';

let assert = require('assert');

let PasswordRestoreSteps = require('../restore');
let SelectTypeViewPage = require('../../../pages/passrestore/selectType');

let selectTypeViewPage = new SelectTypeViewPage();


/** Модуль для работы с формой ввода адреса для восстановления */
class Controls extends PasswordRestoreSteps {
	constructor () {
		super();
	}

	/**
	 * Wait for phone tab
	 */
	waitForPhone () {
		selectTypeViewPage.waitForPhone();
	}

	/**
	 * Crack phone captcha
	 */
	fillPhoneCaptcha () {
		let cid = selectTypeViewPage.phoneCaptchaID,
			captcha = selectTypeViewPage.getPhoneCaptchaValue(cid.value);

		assert(cid.isOK, 'Загружаем новую капчку и читаем ее ID');
		assert(captcha.isOK, 'Получаем код из SWA');

		selectTypeViewPage.fillPhoneCaptcha(captcha.value);
	}
}

module.exports = Controls;
