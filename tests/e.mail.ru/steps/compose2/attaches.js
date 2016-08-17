'use strict';

let assert = require('assert');

let ComposeAttachesSteps = require('../compose/attaches');
let Compose2Attaches = require('../../pages/compose2/attaches');
let Compose2EditorControlsSteps = require('../compose2/editorControls');
let attaches = require('../../utils/attaches/add');

let SystemStore = require('../../store/system');
let compose2EditorControls = new Compose2EditorControlsSteps();

/** Модуль для работы с шагами прикрепления файлов написания письма */
class Compose2AttachesSteps extends ComposeAttachesSteps {
	constructor () {
		super();

		this.composeAttaches = new Compose2Attaches();
	}

	attachFromMail (filename) {
		this.composeAttaches.clickMail();
		this.multiAttach.wait();
		this.multiAttach.toggleMailFile(filename);
		this.multiAttach.apply();
	}

	attachInline (filename) {
		compose2EditorControls.attachInline(filename);
	}
}

module.exports = Compose2AttachesSteps;
