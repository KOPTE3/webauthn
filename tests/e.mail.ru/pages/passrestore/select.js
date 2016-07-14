'use strict';

let PassrestorePage = require('../passrestore');
let captchaUtils = require('../../utils/captcha');
let phonesUtils = require('../../utils/phones');

/** Модуль для работы со страницей выбора типа восстановления пароля */
class SelectViewPage extends PassrestorePage {
	constructor () {
		super();
	}


	/**
	 * Открытие страницы
	 *
	 * @returns {boolean}
	 */
	open (email) {
		return super.open({
			email,
			type: 'method'
		});
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.js-view-select-type',
			phoneTabBlock = '.js-phones-tab-block';

		return {
			container,
			phoneTabBlock,

			form: '.js-form-select-type',
			singlePhoneInput: '.password-recovery__remind__new-phone-editable_single',
			multiplePhoneInput: '.password-recovery__remind__new-phone-editable',
			simpleInput: '.b-segment-input',
			editableInput: '.b-segment-input.b-segment-input_editable',

			radioBtn: 'input[type="radio"]',

			phoneHead: '.b-segment-input__head',
			phoneBody: '.b-segment-input__body',
			phoneMask: '.b-segment-input__mask',
			phoneInput: '.b-segment-input__mask input',
			phoneTail: '.b-segment-input__tail',

			phoneCaptchaImg: '#password-recovery__remind__new__phone_captcha',
			phoneCaptchaField: `${phoneTabBlock} .js-captcha`,
			phoneCodeField: '#signupsms_code',
			phoneLayer: '.is-signupsms_in'
		};
	}

	/**
	 * Попытка восстановить пароль
	 */
	submitForm () {
		this.page.submitForm(this.locators.form);
	}

	/**
	 * Get X-Captcha-Id header from page
	 * @returns {Object}
	 */
	get phoneCaptchaID () {
		return captchaUtils.getCaptchaID(this.locators.phoneCaptchaImg);
	}

	/**
	 * Get captcha value by X-Captcha-Id
	 * @param {string} cid
	 * @returns {Object}
	 */
	getPhoneCaptchaValue (cid) {
		let code;

		this.page.waitUntil(function async () {
			return captchaUtils.getCaptchaValue(cid).then(result => {
				code = result;

				return true;
			});
		});

		return {
			value: code,
			isOK: typeof code === 'string'
		};
	}

	/**
	 * Get SMS code value by email and reg_token.id
	 * http://api.tornado.dev.mail.ru/test/tokens/info
	 * @param  {string} email
	 * @param  {string} id
	 * @returns {Object}
	 */
	getSmsCodeValue (email, id) {
		let code = null;

		this.page.waitUntil(function async () {
			return phonesUtils.getSmsCodeValue(email, id).then(result => {
				if (result.isOK) {
					code = result.body.code;
				}

				return true;
			});
		});

		return {
			value: code,
			isOK: typeof code === 'string'
		};
	}

	/**
	 * Get b-segment-input field value
	 * @return {string}
	 */
	getPhoneInputValue () {
		return this.page.getValue(this.locators.phoneInput);
	}

	/**
	 * Fill code field
	 * @param {string} code
	 */
	fillPhoneCaptcha (code) {
		this.page.setValue(this.locators.phoneCaptchaField, code);
	}

	/**
	 * Fill sms code field
	 * @param {string} code
	 */
	fillSmsCode (code) {
		this.page.setValue(this.locators.phoneCodeField, code);
	}

	/**
	 * Fill b-segmented-input field
	 * @param {string} value
	 */
	fillPhoneInput (value) {
		this.page.setValue(this.locators.phoneInput, value);
	}

	/**
	 * Waiting for the phone tab
	 */
	waitForPhoneTab () {
		this.page.waitForVisible(this.locators.phoneTabBlock);
	}

	/**
	 * Waiting for this phone layer
	 */
	waitForPhoneLayer () {
		this.page.waitForVisible(this.locators.phoneLayer);
	}
}

module.exports = SelectViewPage;
