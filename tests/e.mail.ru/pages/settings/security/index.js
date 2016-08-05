'use strict';

let Page = require('../../../pages');

class SecurityPage extends Page {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/settings/security';
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '#LEGO',
			twoStepAuth: {
				enableButton: '.js-2StepAuthEnable',
				enablePopup: '.is-user-2-step-auth-enable_in',
				confirmPopup: '.is-user-2-step-auth-enable-confirm_in',
				popupDescription: '.popup__desc',
				fields: {
					phone: '.js-select',
					code: '.js-reg_token-field',
					password: '.js-password-field'
				},
				popupContinueButton: '[data-name="submit"]'
			}
		};
	}

	/**
	 * Открывает попап двухфакторки
	 */
	click2StepAuthEnableButton () {
		this.page.click(this.locators.twoStepAuth.enableButton);
	}

	/**
	 * Нажимает кнопку подтверждения телефона
	 */
	click2StepAuthContinueButton () {
		this.page.click(`${this.locators.twoStepAuth.enablePopup} ` +
			`${this.locators.twoStepAuth.popupContinueButton}`);
	}

	/**
	 * Проверяет текст в попапе двухфакторки
	 * @param {string} popup
	 * @returns {boolean}
	 */
	get2StepAuthPopupDescription (popup) {
		let text;

		text = this.page.getText(`${this.locators.twoStepAuth[popup]} ` +
			`${this.locators.twoStepAuth.popupDescription}`);

		return (typeof text === 'string') ? text : text[0];
	}

	/**
	 * Ждет появления попапа
	 * @param {string} popup
	 */
	waitFor2StepAuthPopup (popup) {
		this.page.waitForVisible(this.locators.twoStepAuth[popup]);
	}

	/**
	 * Проверяет видимость полей в попапе
	 * @param {string} popup
	 * @param {string} name
	 * @returns {boolean}
	 */
	is2StepAuthFieldVisible (popup, name) {
		return this.page.isVisible(`${this.locators.twoStepAuth[popup]} ` +
			`${this.locators.twoStepAuth.fields[name]}`);
	}
}

module.exports = SecurityPage;
