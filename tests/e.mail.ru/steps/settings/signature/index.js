'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let SettingsSignaturePage = require('../../../pages/settings/signature');

let SignatureEditorControlsSteps = require('../signature/editorControls');
let SignatureEditorSteps = require('../signature/editor');

let signatureEditorControls = [
	new SignatureEditorControlsSteps(0),
	new SignatureEditorControlsSteps(1),
	new SignatureEditorControlsSteps(2)
];
let signatureEditors = [
	new SignatureEditorSteps(0),
	new SignatureEditorSteps(1),
	new SignatureEditorSteps(2)
];

class Signature extends Steps {

	/**
	 * Возвращает ссылку на инстанс страницы
	 *
	 * @type {Object}
	 */
	static get page () {
		return new SettingsSignaturePage();
	}

	static createSignature () {
		this.page.createSignature(...arguments);
	}

	/**
	 * Добавить новое поле для имени и подписи
	 */
	static addSignature () {
		this.page.addSignature();
	}

	/**
	 * Задать текст подписи
	 *
	 * @param {string} value - текст
	 * @param {number} [index] - номер подписи (0, 1, 2)
	 */
	static setSignature (value, index = 0) {
		this.page.setSignatureValue(value, index);
	}

	static removeAllSignatures () {
		this.page.removeAllSignatures();
		this.setSignature('');
	}

	static save () {
		this.page.clickControl('save');
	}

	static hasSignature (signature) {
		let actual = this.page.hasSignature(signature);

		assert(actual, `Не найдена подпись ${signature}`);
	}

	/**
	 * Проверить наличие текста в конкретной подписи
	 *
	 * @param {string} signature
	 * @param {number} [index]
	 */
	static checkSignature (signature, index = 0) {
		signatureEditors[index].messageContains(signature);
	}

	/**
	 * Есть редактор
	 */
	static hasWysiwyg () {
		let actual = this.page.hasWysiwyg();

		assert(actual, 'Редактор не показался');
	}

	static attachInline (filename, index = 0) {
		signatureEditorControls[index].attachInline(filename);
	}

	static attachInvalidInline (filename, index = 0) {
		signatureEditorControls[index].attachInvalidInline(filename);
	}

	static hasInline (index = 0) {
		signatureEditors[index].hasInline();
	}
}

module.exports = Signature;
