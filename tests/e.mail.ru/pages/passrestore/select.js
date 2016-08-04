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
	 * @param {string} email
	 * @returns {boolean}
	 */
	open (email) {
		return super.open({
			email,
			type: 'method'
		});
	}

	/**
	 * Дождаться открытия страницы
	 *
	 * @returns {boolean}
	 */
	wait () {
		return this.page.waitForVisible(this.locators.container);
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.js-view-select-type',
			phoneTabBlock = '.js-phones-tab-block',
			phoneLayer = '.is-signupsms_in',
			error = '.password-recovery__remind__new-tabs__header_error';

		return {
			container,
			phoneTabBlock,
			tabError: `.selected ${error}`,

			form: '.js-form-select-type',
			singlePhone: '.password-recovery__remind__new-phone-editable_single',
			multiplePhone: '.password-recovery__remind__new-phone-editable',
			simplePhone: '.b-segment-input',
			editablePhone: '.b-segment-input.b-segment-input_editable',

			radioBtn: 'input[type="radio"]',

			phoneHead: '.b-segment-input__head',
			phoneBody: '.b-segment-input__body',
			phoneMask: '.b-segment-input__mask',
			phoneInput: '.b-segment-input__mask input',
			phoneTail: '.b-segment-input__tail',

			phoneCaptchaImg: '#password-recovery__remind__new__phone_captcha',
			phoneCaptchaField: `${phoneTabBlock} .js-captcha`,

			phoneLayer,
			phoneLayerInfo: `${phoneLayer} .info`,
			phoneLayerLink: `${phoneLayer} .pseudo-link`,
			phoneLayerForm: `${phoneLayer} form`,
			phoneCodeField: '#signupsms_code',
			phoneCodeSubmitBtn: `${phoneLayer} [type="submit"]`
		};
	}

	/**
	 * Попытка восстановить пароль
	 */
	submitForm () {
		this.page.submitForm(this.locators.form);
	}

	/**
	 * Попытка восстановить пароль
	 */
	submitPhoneCodeLayer () {
		this.page.submitForm(this.locators.phoneCodeSubmitBtn);
	}

	/**
	 * Get X-Captcha-Id header from page
	 * @returns {Object}
	 */
	get phoneCaptchaID () {
		return captchaUtils.getCaptchaID(this.locators.phoneCaptchaImg);
	}

	getLastRegTokenId () {
		return phonesUtils.getPassRestoreRegTokenId();
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
	 *
	 * @param {int} [id]
	 * @return {WebElement}
	 */
	getPhoneContainer (id = null) {
		let selector = this.locators.singlePhone;

		if (id !== null) {
			selector = this.locators.multiplePhone + `[data-index="${id}"]`;
		}

		this.page.waitForVisible(selector);

		return this.page.element(selector);
	}

	/**
	 *
	 * @param {int} [id]
	 * @returns {WebElement}
	 */
	getPhoneInput (id) {
		const element = this.getPhoneContainer(id);

		if (!element.value) {
			return null;
		}

		return element.element(this.locators.phoneInput);
	}

	/**
	 *
	 * @param {int} [id]
	 * @returns {Object} !
	 */
	getPhoneParameters (id) {
		const element = this.getPhoneContainer(id);
		const {phoneHead, phoneInput, phoneBody, phoneMask, phoneTail} = this.locators;

		if (!element.value) {
			return null;
		}

		return {
			head: element.getText(phoneHead),
			value: element.getValue(phoneInput),
			body: element.getText(phoneBody),
			placeholder: element.getAttribute(phoneInput, 'placeholder'),
			tail: element.getText(phoneTail),
			color: element.getCssProperty('color').parsed.hex,
			isMaskVisible: element.isVisible(phoneMask)
		};
	}

	/**
	 * Get info message in phoneLayer
	 *
	 * @returns {string} value
	 */
	getPhoneLayerInfo () {
		return this.page.getText(this.locators.phoneLayerInfo);
	}

	/**
	 * Get params of phone layer resend link
	 *
	 * @returns {Object} params
	 */
	getPhoneLayerLink () {
		let link = this.page.element(this.locators.phoneLayerLink);

		return {
			text: link.getText(),
			cursor: link.getCssProperty('cursor').value
		};
	}

	/**
	 * Get error message from current tab
	 *
	 * @returns {string} text
	 */
	getTabErrorValue () {
		const {tabError} = this.locators;

		this.page.waitForVisible(tabError);

		return this.page.getText(tabError);
	}

	/**
	 * Select b-segment-input
	 * @param {int} [id]
	 */
	selectPhoneContainer (id) {
		const element = this.getPhoneContainer(id);

		this.page.click(element.selector);
	}

	/**
	 * Get b-segment-input field value
	 * @param {int} [id]
	 * @return {string}
	 */
	getPhoneInputValue (id) {
		const element = this.getPhoneInput(id);

		if (!element) {
			return null;
		}

		return element.getValue();
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
	 * @param {int} [id]
	 */
	fillPhoneInput (value, id) {
		let phone = this.getPhoneInput(id);

		phone.setValue(value);
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
