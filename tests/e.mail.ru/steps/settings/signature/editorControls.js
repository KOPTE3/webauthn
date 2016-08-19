'use strict';

let assert = require('assert');

let Compose2EditorControlsSteps = require('../../../steps/compose2/editorControls');
let SignatureEditorControls = require('../../../pages/settings/signature/editorControls');
let SignatureEditorSteps = require('../../../steps/settings/signature/editor');

/** Модуль для работы с шагами контролов редактора подписи */
class SignatureEditorControlsSteps extends Compose2EditorControlsSteps {
	constructor (index = 0) {
		super();

		this.controls = new SignatureEditorControls(index);
		this.compose2EditorSteps = new SignatureEditorSteps(index);
	}

	attachInline (filename) {
		super.attachInline(filename, 'user/signature/attaches/add');
	}
}

module.exports = SignatureEditorControlsSteps;
