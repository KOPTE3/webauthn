'use strict';

let assert = require('assert');

let ComposeSteps = require('../compose');
let ComposeEditorControls = require('../../pages/compose/editorControls');

/** Модуль для работы с шагами контролов редактора страницы написания письма */
class ComposeEditorControlsSteps extends ComposeSteps {
	constructor () {
		super();

		this.controls = new ComposeEditorControls();
	}

	/**
	 * Нажать на кнопку "Подпись"
	 */
	toggleSignature () {
		this.controls.clickLink('signature');
	}

	/**
	 * Проверить видимость дропдауна с подписями
	 */
	isVisibleSignature () {
		let actual = this.controls.isVisibleSignature();

		assert(actual, 'Дропдаун с подписями не открыт');
	}

	/**
	 * Дропдаун с подписями содержит подпись
	 *
	 * @param {string} text - текст подписи
	 */
	hasSignature (text) {
		let actual = this.controls.hasSignature(text);

		assert(actual, `Среди подписей нет ${text}`);
	}

	/**
	 * Проверить текст активной подписи
	 *
	 * @param {string} text - текст подписи
	 */
	isSelectedSignature (text) {
		let actual = this.controls.getSelectedSignatureText();

		assert.equal(actual, text, `Текст выбранной подписи ${actual} не равен ${text}`);
	}

	/**
	 * В дропдауне подписей есть ссылка на настройки
	 */
	isSignatureHasSettingsLink () {
		let actual = this.controls.isSignatureHasSettingsLink();

		assert(actual, 'Дропдаун с подписями не содержит ссылку на настройки');
	}

	/**
	 * Кликнуть по ссылке настроек
	 */
	clickSignatureSettings () {
		this.controls.clickSignatureSettings();
	}

	/**
	 * Кликнуть по подписи
	 * @param {number} index - номер подписи
	 */
	clickSignature (index) {
		this.controls.clickSignature(index);
	}
}

module.exports = ComposeEditorControlsSteps;
