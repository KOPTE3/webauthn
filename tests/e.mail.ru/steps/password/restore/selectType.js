'use strict';

let assert = require('assert');

let PasswordRestoreSteps = require('../restore');
let selectTypeViewPage = require('../../../pages/passrestore/selectType');
let Phones = require('../../../utils/phones');


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
	 */
	fillPhoneCode () {
		let regTokenId = Phones.getLastPassremindRegTokenId();

		Internal.getSmsCode(regTokenId);
	}

	/**
	 * Submit form
	 */
	submitForm () {
		selectTypeViewPage.submitForm();
	}
}

module.exports = new Controls();
