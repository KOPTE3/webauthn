'use strict';

let Compose2EditorControls = require('../../compose2/editorControls');

const ATTACH_TIMEOUT = 1000;

/** Модуль для работы с контролами редактора подписи */
class SignatureEditorControls extends Compose2EditorControls {
	constructor () {
		super();
	}

	get locatorContainer () {
		return '#options-form-signature .js-signature-container:first-of-type';
	}
}

module.exports = SignatureEditorControls;
