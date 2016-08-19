'use strict';

let Compose2EditorControls = require('../../compose2/editorControls');

const ATTACH_TIMEOUT = 1000;

/** Модуль для работы с контролами редактора подписи */
class SignatureEditorControls extends Compose2EditorControls {
	constructor (index = 0) {
		super();

		this.index = index;
	}

	get locatorContainer () {
		return `#options-form-signature .js-signature-container:nth-of-type(${this.index + 1})`;
	}
}

module.exports = SignatureEditorControls;
