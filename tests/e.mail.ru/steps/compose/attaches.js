'use strict';

let assert = require('assert');

let ComposeSteps = require('../compose');
let MultiAttachSteps = require('../layers/multiAttach');

let ComposeAttaches = require('../../pages/compose/attaches');

let SystemStore = require('../../store/system');


/** Модуль для работы с шагами прикрепления файлов написания письма */
class ComposeAttachesSteps extends ComposeSteps {
	constructor () {
		super();

		this.composeAttaches = new ComposeAttaches();
		this.multiAttach = new MultiAttachSteps();
	}

	uploadAttach (filename) {
		const filepath = SystemStore.file(filename);

		assert(this.composeAttaches.hasAttachField(), 'Инпут загрузки файла не существует');

		this.composeAttaches.uploadAttach(filepath);

		assert(this.composeAttaches.isVisibleSlider(), 'Слайдер не видно');
	}

	removeAttach (filename) {
		assert(this.composeAttaches.isFileAttached(filename), 'Файл не прикреплен');

		this.composeAttaches.removeAttach(filename);

		assert(this.composeAttaches.isFileAttached(filename, true), 'Файл не удален');
	}

	hasAttach (filename) {
		let result = this.composeAttaches.isFileAttached(filename);

		assert(result, `Файл ${filename} не прикреплен`);
	}

	attachFromCloud (filename) {
		this.composeAttaches.clickCloud();
		this.multiAttach.wait();
		this.multiAttach.toggleCloudFile(filename);
		this.multiAttach.apply();
	}

	attachFromMail (filename) {
		this.composeAttaches.clickCloud();
		this.multiAttach.wait();
		this.multiAttach.clickMail();
		this.multiAttach.toggleMailFile(filename);
		this.multiAttach.apply();
	}
}

module.exports = ComposeAttachesSteps;
