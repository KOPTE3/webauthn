'use strict';

let assert = require('assert');

let ComposeEditorControlsSteps = require('../../steps/compose/editorControls');
let Compose2EditorControls = require('../../pages/compose2/editorControls');

/** Модуль для работы с шагами контролов редактора страницы написания письма */
class Compose2EditorControlsSteps extends ComposeEditorControlsSteps {
	constructor () {
		super();

		this.controls = new Compose2EditorControls();
	}
}

module.exports = Compose2EditorControlsSteps;
