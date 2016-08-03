'use strict';

let assert = require('assert');

let PassrestoreSteps = require('../passrestore');
let SelectTypePage = require('../../pages/passrestore/select');

let phonesUtils = require('../../utils/phones');


/** Модуль для работы с формой ввода адреса для восстановления */
class SelectTypeSteps extends PassrestoreSteps {
	constructor () {
		super();
		this.page = new SelectTypePage();
	}

	open (email) {
		let result = this.page.open(email);

		assert(result, `Страница восстановления пароля для ${email} не открылась`);
	}

	/**
	 * Дождаться открытия страницы
	 *
	 */
	wait () {
		let result = this.page.wait();

		assert(result, `Страница восстановления пароля не открылась`);
	}

	/**
	 * Fill phone input field
	 * @param {string} value
	 * @param {int} [id]
	 */
	fillPhoneInput (value, id) {
		this.page.fillPhoneInput(value, id);
	}

	checkPhoneCaptcha (value, equal) {
		const result = this.getPhoneCaptchaValue() === value;

		assert.equal(result, equal, 'Значение капчи не совпало');
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
	 * Test phone displayed in phoneLayer
	 *
	 * @param {string} head - '+7 (912) 2'
	 * @param {string} value - missing numbers '11'
	 */
	checkPhoneLayerInfo (head, value) {
		let result = this.page.getPhoneLayerInfo();
		let phone = head + value + '-**-**';
		let message = 'Код подтверждения отправлен на номер ' + phone + '.';

		assert.equal(result, message, 'В номере телефона цифры некорректны');
	}

	/**
	 * Test resend link dsplayed in phoneLayer
	 *
	 * @param {string} message - text in the link
	 */
	checkPhoneLayerLink (message) {
		let result = this.page.getPhoneLayerLink();

		assert.equal(result.text, message, 'Текст не соответствует');
		assert.equal(result.cursor, 'pointer', 'Указатель не сменился на поинтер');
	}

	/**
	 * Check that selected tab has error message
	 *
	 * @param {string} text
	 */
	checkTabError (text) {
		let result = this.page.getTabErrorValue();

		assert.equal(result, text, 'Текст ошибки не совпадает');
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
	 * Crack phone captcha
	 *
	 * @returns {string} captcha value
	 */
	getPhoneCaptchaValue () {
		let cid = this.page.phoneCaptchaID,
			captcha = this.page.getPhoneCaptchaValue(cid.value);

		assert(cid.isOK, 'Загружаем новую капчку и читаем ее ID');
		assert(captcha.isOK, 'Получаем код из SWA');

		return captcha.value;
	}

	/**
	 * Fill phone captcha field
	 *
	 * @param {string} value
	 */
	fillPhoneCaptcha (value) {
		if (!value) {
			value = this.getPhoneCaptchaValue();
		}

		this.page.fillPhoneCaptcha(value);
	}

	/**
	 * Crack SMS code
	 * @param {restoreEmail} restoreEmail
	 */
	fillSmsCode (restoreEmail) {
		let regTokenId = this.page.getLastRegTokenId();
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
	 * Submit sms code layer
	 */
	submitPhoneLayer () {
		this.page.submitPhoneCodeLayer();
	}
}

module.exports = SelectTypeSteps;
