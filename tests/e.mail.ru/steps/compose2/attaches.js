'use strict';

let assert = require('assert');

let ComposeAttachesSteps = require('../compose/attaches');
let Compose2Attaches = require('../../pages/compose2/attaches');
let Compose2EditorSteps = require('../compose2/editor');
let attaches = require('../../utils/attaches/add');

let SystemStore = require('../../store/system');
let compose2EditorSteps = new Compose2EditorSteps();

/** Модуль для работы с шагами прикрепления файлов написания письма */
class Compose2AttachesSteps extends ComposeAttachesSteps {
	constructor () {
		super();

		this.composeAttaches = new Compose2Attaches();
	}

	registerAddLogger () {
		attaches.registerAddLogger();
	}

	attachFromMail (filename) {
		this.composeAttaches.clickMail();
		this.multiAttach.wait();
		this.multiAttach.toggleMailFile(filename);
		this.multiAttach.apply();
	}

	attachInline (filename) {
		let filepath = SystemStore.file(filename);
		let data;

		this.composeAttaches.attachInline(filepath);
		data = attaches.getLastAddedFileData();

		assert(data, 'Данные об аттаче не получены');

		compose2EditorSteps.waitForInlineAttach(data.attach.id);
	}
}

module.exports = Compose2AttachesSteps;
