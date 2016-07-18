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
	 * @param {int} [id]
	 */
	fillPhoneInput (value, id) {
		this.page.fillPhoneInput(value, id);
	}

	/**
	 * Test phone input field value
	 * @param {string} value
	 */
	checkPhoneInput (value) {
		let result = this.page.getPhoneInputValue();

		assert(value === result, 'Значение введенных цифр не совпадает с заданым: ' + result);
	}

	/**
	 * Test b-segment-input visible number
	 * @param {string} head - '+7 (912) 2'
	 * @param {string} value - missing numbers '11'
	 */
	checkPhone (head, value) {
		let data = this.page.getPhoneParameters();

		assert.equal(data.head, head, 'Начало телефона не совпадает');
		assert.equal(data.value, value, 'Введенное значение не совпадает');
		assert.equal(data.placeholder, '**');
		assert.equal(data.tail, '-**-**', 'Последние 4 цифры не замаскированы');
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
	 * Check if phone input is selected (multiple)
	 * @param {int} id
	 * @param {string} head - '+7 (912) 2'
	 * @param {string} value - missing numbers '11'
	 */
	phoneInputIsActive (id, head, value) {
		const data = this.page.getPhoneParameters(id);
		const msg = `Телефон ${id} не выбран.`;

		assert(data, `Не удалось получить телефон ${id}`);

		assert.equal(data.head, head, `${msg} Начало телефона не совпадает`);
		assert.equal(data.value, value, `${msg} Введенные цифры не совпадают`);
		assert.equal(data.placeholder, '**', `${msg} Плейсхолдер не **`);
		assert.equal(data.tail, '-**-**', `${msg} Конец номера не замаскирован`);
		assert.equal(data.color, '#333333', `${msg} Цвет не совпадает`);
		assert(data.isMaskVisible, `${msg} Введенные цифры не видно`);
	}

	/**
	 * Check if phone input is disabled (multiple)
	 * @param {int} id
	 * @param {string} head - '+7 (912) 2'
	 */
	phoneInputIsDisabled (id, head) {
		const data = this.page.getPhoneParameters(id);
		const msg = `Телефон ${id} выбран.`;

		assert(data, `Не удалось получить телефон ${id}`);

		assert.equal(data.head, head, `${msg} Начало телефона не совпадает`);
		assert.equal(data.body, '**', `${msg} Введенные цифры не замаскированы`);
		assert.equal(data.tail, '-**-**', `${msg} Конец номера не замаскирован`);
		assert.equal(data.color, '#a2a6a9', `${msg} Цвет не совпадает`);
		assert(!data.isMaskVisible, `${msg} Введенные цифры видно`);
	}

	/**
	 * Click on phone input (multiple)
	 * @param {int} [id]
	 */
	selectPhoneInput (id) {
		this.page.selectPhoneContainer(id);
	}

	/**
	 * Submit form
	 */
	submitForm () {
		this.page.submitForm();
	}

	/**
	 * Verify phone number
	 * @param {string} email
	 * @param {string} phone '79151420923'
	 */
	verifyPhone (email, phone) {
		this.page.verifyPhone(email, phone);
	}
}

module.exports = SelectTypeSteps;
