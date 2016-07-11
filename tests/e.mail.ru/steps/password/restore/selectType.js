'use strict';

let assert = require('assert');

let PasswordRestoreSteps = require('../restore');
let selectTypeViewPage = require('../../../pages/passrestore/selectType');
let Phones = require('../../../utils/phones');
let Internal = require('../../../utils/internalApi');


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
	 * Wait for phone layer
	 */
	waitForPhoneLayer () {
		selectTypeViewPage.waitForPhoneLayer();
	}

	/**
	 * Crack phone captch
	 */
	fillPhoneCaptcha () {
		let cid = selectTypeViewPage.phoneCaptchaID,
			captcha = selectTypeViewPage.getPhoneCaptchaValue(cid.value);

		assert(cid.isOK, 'Загружаем новую капчку и читаем ее ID');
		assert(captcha.isOK, 'Получаем код из SWA');

		selectTypeViewPage.fillPhoneCaptcha(captcha.value);
	}

	/**
	 * Crack SMS code
	 * @param {restoreEmail} restoreEmail
	 */
	fillSmsCode (restoreEmail) {
		let regTokenId = Phones.getLastPassremindRegTokenId(),
			code = selectTypeViewPage.getSmsCodeValue(restoreEmail, regTokenId);

		selectTypeViewPage.fillSmsCode(code.value);
	}

	/**
	 * Submit form
	 */
	submitForm () {
		selectTypeViewPage.submitForm();
	}
}

module.exports = new Controls();
