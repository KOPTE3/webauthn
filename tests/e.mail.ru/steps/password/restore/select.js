'use strict';

let assert = require('assert');

let PasswordRestoreSteps = require('../restore');
let SelectTypePage = require('../../../pages/passrestore/select');

let phonesUtils = require('../../../utils/phones');


/** Модуль для работы с формой ввода адреса для восстановления */
class SelectTypeSteps extends PasswordRestoreSteps {
	constructor () {
		super();
		this.page = new SelectTypePage();
	}

	open (email) {
		let result = this.page.open(email);

		assert(result, `Страница восстановления пароля для ${email} не открылась`);
	}

	/**
	 * Fill phone input field
	 * @param {string} value
	 */
	fillPhoneInput (value) {
		this.page.fillPhoneInput(value);
	}

	/**
	 * Test phone input field value
	 * @param {string} value
	 */
	checkPhoneInput (value) {
		let result = this.page.getPhoneInputValue();

		assert(value === result, 'Значение введенных цифр не совпадает с заданым');
	}

	/**
	 * Wait for phone tab
	 */
	waitForPhoneTab () {
		this.page.waitForPhoneTab();
	}

	/**
	 * Wait for phone layer
	 */
	waitForPhoneLayer () {
		this.page.waitForPhoneLayer();
	}

	/**
	 * Crack phone captch
	 */
	fillPhoneCaptcha () {
		let cid = this.page.phoneCaptchaID,
			captcha = this.page.getPhoneCaptchaValue(cid.value);

		assert(cid.isOK, 'Загружаем новую капчку и читаем ее ID');
		assert(captcha.isOK, 'Получаем код из SWA');

		this.page.fillPhoneCaptcha(captcha.value);
	}

	/**
	 * Crack SMS code
	 * @param {restoreEmail} restoreEmail
	 */
	fillSmsCode (restoreEmail) {
		let regTokenId = phonesUtils.getLastPassremindRegTokenId();
		let code = this.page.getSmsCodeValue(restoreEmail, regTokenId);

		this.page.fillSmsCode(code.value);
	}

	/**
	 * Submit form
	 */
	submitForm () {
		this.page.submitForm();
	}
}

module.exports = SelectTypeSteps;
