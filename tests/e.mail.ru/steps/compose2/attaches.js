'use strict';

let assert = require('assert');

let ComposeAttachesSteps = require('../compose/attaches');
let Compose2Attaches = require('../../pages/compose2/attaches');

let SystemStore = require('../../store/system');


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
		const filepath = SystemStore.file(filename);

		this.composeAttaches.attachInline(filepath);
	}
}

module.exports = Compose2AttachesSteps;
