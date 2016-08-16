'use strict';

let assert = require('assert');

let ComposeEditorControlsSteps = require('../../steps/compose/editorControls');
let Compose2EditorControls = require('../../pages/compose2/editorControls');
let Compose2EditorSteps = require('../compose2/editor');

let SystemStore = require('../../store/system');
let compose2EditorSteps = new Compose2EditorSteps();

let attaches = require('../../utils/attaches/add');

/** Модуль для работы с шагами контролов редактора страницы написания письма */
class Compose2EditorControlsSteps extends ComposeEditorControlsSteps {
	constructor () {
		super();

		this.controls = new Compose2EditorControls();
	}

	registerAddLogger (url = void 0) {
		attaches.registerAddLogger(url);
	}

	attachInline (filename, url = void 0) {
		let filepath = SystemStore.file(filename);
		let data;

		this.registerAddLogger(url);
		this.controls.attachInline(filepath);
		data = attaches.getLastAddedFileData(url);

		assert(data, 'Данные об аттаче не получены');

		compose2EditorSteps.waitForInlineAttach(data.attach.id.replace(/\-.*$/, ''));
	}
}

module.exports = Compose2EditorControlsSteps;
