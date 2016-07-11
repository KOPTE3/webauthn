'use strict';

let PageObject = require('../../pages');
let captcha = require('../../utils/captcha');

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
			phoneCaptchaImg: '#password-recovery__remind__new__phone_captcha',
			phoneCaptchaField: `${phoneTabBlock} .js-captcha`
		};
	}

	/**
	 * Get X-Captcha-Id header from page
	 * @returns {Object}
	 */
	get phoneCaptchaID () {
		return captcha.getCaptchaID(this.locators.phoneCaptchaImg);
	}

	/**
	 * Get captcha value by X-Captcha-Id
	 * @param {string} cid
	 * @returns {Object}
	 */
	getPhoneCaptchaValue (cid) {
		let code;

		this.page.waitUntil(function async () {
			return captcha.getCaptchaValue(cid).then(result => {
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
	 * Fill code field
	 * @param {string} code
	 */
	fillPhoneCaptcha (code) {
		this.page.setValue(this.locators.phoneCaptchaField, code);
	}

	/**
	 * Waiting for the phone tab
	 */
	waitForPhone () {
		this.page.waitForVisible(this.locators.phoneTabBlock);
	}
}

module.exports = Controls;
