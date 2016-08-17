'use strict';

let assert = require('assert');

let Steps = require('../../../steps');
let SettingsSignaturePage = require('../../../pages/settings/signature');

let SignatureEditorControlsSteps = require('../signature/editorControls');
let signatureEditorControls = new SignatureEditorControlsSteps();

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

	static removeAllSignatures () {
		this.page.removeAllSignatures();
	}

	static save () {
		this.page.clickControl('save');
	}

	static hasSignature (signature) {
		let actual = this.page.hasSignature(signature);

		assert(actual, `Не найдена подпись ${signature}`);
	}

	/**
	 * Есть редактор
	 */
	static hasWysiwyg () {
		let actual = this.page.hasWysiwyg();

		assert(actual, 'Редактор не показался');
	}

	static attachInline (filename) {
		signatureEditorControls.attachInline(filename);
	}

	static attachInvalidInline (filename) {
		signatureEditorControls.attachInvalidInline(filename);
	}
}

module.exports = Signature;
