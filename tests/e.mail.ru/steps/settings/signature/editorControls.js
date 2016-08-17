'use strict';

let assert = require('assert');

let Compose2EditorControlsSteps = require('../../../steps/compose2/editorControls');
let SignatureEditorControls = require('../../../pages/settings/signature/editorControls');

/** Модуль для работы с шагами контролов редактора подписи */
class SignatureEditorControlsSteps extends Compose2EditorControlsSteps {
	constructor () {
		super();

		this.controls = new SignatureEditorControls();
	}

	attachInline (filename) {
		super.attachInline(filename, 'user/signature/attaches/add');
	}
}

module.exports = SignatureEditorControlsSteps;
