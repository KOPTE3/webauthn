'use strict';

let assert = require('assert');

let SecurityPage = require('../../../pages/settings/security');
let SettingsSteps = require('..');

let authStore = require('../../../store/authorization');

let page = new SecurityPage();

class SecuritySteps extends SettingsSteps {
	constructor () {
		super();
	}

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return page;
	}

	/**
	 * Открыть попап двухфакторки
	 */
	static open2StepAuthPopup () {
		this.page.click2StepAuthEnableButton();

		this.page.waitFor2StepAuthPopup('enablePopup');
	}

	/**
	 * Подтвердить тефон в попапе двухфакторки
	 */
	static contiune2StepAuthPopup () {
		this.page.click2StepAuthContinueButton();

		this.page.waitFor2StepAuthPopup('confirmPopup');
	}

	/**
	 * Проверить текст в попапе двухфакторки
	 * @param {string} popup
	 * @param {string} description
	 */
	static check2StepAuthPopupDescription (popup, description) {
		let actual = this.page.get2StepAuthPopupDescription(popup).match(description);

		assert(actual, `Текст попапа не совпадает с "${description}"`);
	}

	/**
	 * Проверить поле Телефон в попапе двухфакторки
	 */
	static check2StepAuthPhoneField () {
		let actual = this.page.is2StepAuthFieldVisible('enablePopup', 'phone');

		assert(actual, `Поле "Телефон" должно быть видимым`);
	}

	/**
	 * Проверить поле Код в попапе двухфакторки
	 */
	static check2StepAuthCodeField () {
		let actual = this.page.is2StepAuthFieldVisible('confirmPopup', 'code');

		assert(actual, `Поле "SMS-код" должно быть видимым`);
	}

	/**
	 * Проверить поле Пароль в попапе двухфакторки
	 */
	static check2StepAuthPasswordField () {
		let actual = this.page.is2StepAuthFieldVisible('confirmPopup', 'password');

		assert(actual, `Поле "Пароль" должно быть видимым`);
	}
}

module.exports = SecuritySteps;
