'use strict';

let assert = require('assert');

let SettingsMessagesSteps = require('../../../steps/settings/messages');
let FormPage = require('../../../pages/settings/messages/form');
let SettingsPage = require('../../settings');

/** Модуль для работы с формой настроек пользвоателя */
class FormSteps extends SettingsMessagesSteps {
	constructor () {
		super();

		this.formPage = new FormPage();
		this.settingsPage = new SettingsPage();
	}

	/**
	 * Переключить состояние поля
	 *
	 * @param {string} name - имя поля
	 * @param {state} [state] - в какое состояние переключить (по умолчанию true);
	 *
	 * */
	toggleField (name, state = true) {
		if (!this.formPage.isFieldSelected(name) === state) {
			this.formPage.clickField(name);
		}
	}

	/**
	 * Сохранить значения формы
	 * */
	save () {
		this.formPage.save();
		SettingsPage.wait();
	}
}

module.exports = FormSteps;
