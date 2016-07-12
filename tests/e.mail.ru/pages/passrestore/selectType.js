'use strict';

let PageObject = require('../../pages');
let captchaUtils = require('../../utils/captcha');
let phonesUtils = require('../../utils/phones');

/** Модуль для работы со страницей выбора типа восстановления пароля */
class Controls extends PageObject {
	constructor () {
		super();
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
	 * Fill code field
	 * @param {string} code
	 */
	fillPhoneCaptcha (code) {
		this.page.setValue(this.locators.phoneCaptchaField, code);
	}

	/**
	 * Fill sms code field
	 * @param  {string} code
	 */
	fillSmsCode (code) {
		this.page.setValue(this.locators.phoneCodeField, code);
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

module.exports = Controls;
