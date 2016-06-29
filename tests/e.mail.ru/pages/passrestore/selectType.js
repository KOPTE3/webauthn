'use strict';

let PageObject = require('../../pages');
let Captcha = require('../../utils/captcha');
let assety = require('assert');

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
	 * Crack and fill captcha
	 */
	fillPhoneCaptcha () {
		let cid = Captcha.getCaptchaID(this.locators.phoneCaptchaImg),
			code;

		this.page.waitUntil(function async () {
			return Captcha.getCaptchaValue(cid.value).then(result => {
				code = result;

				return typeof result === 'string';
			});
		});

		this.page.setValue(this.locators.phoneCaptchaField, code);
	}

	/**
	 * Waiting for the phone tab
	 */
	waitForPhone () {
		this.page.waitForVisible(this.locators.phoneTabBlock);
	}

}

module.exports = new Controls();
