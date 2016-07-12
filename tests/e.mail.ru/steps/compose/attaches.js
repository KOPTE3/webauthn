'use strict';

let assert = require('assert');

let ComposeSteps = require('../compose');
let ComposeAttaches = require('../../pages/compose/attaches');

let AttachesStore = require('../../store/attachments');


/** Модуль для работы с шагами прикрепления файлов написания письма */
class ComposeAttachesSteps extends ComposeSteps {
	constructor () {
		super();

		this.composeAttaches = new ComposeAttaches();
	}

	uploadAttach (filename) {
		const filepath = AttachesStore.file(filename);

		assert(this.composeAttaches.attachField.isExisting(), 'Инпут загрузки файла существует');

		this.composeAttaches.uploadAttach(filepath);

		assert(this.composeAttaches.slider.isVisible(), 'Слайдер видно');
		// assert(this.composeAttaches.isFileAttached(filename), `Файл прикреплен`);
	}

	removeAttach (filename) {
		assert(this.composeAttaches.isFileAttached(filename), 'Файл прикреплен');

		this.composeAttaches.removeAttach(filename);

		assert(!this.composeAttaches.isFileAttached(filename), 'Файл удален');
	}

	hasAttach (filename) {
		let result = this.composeAttaches.isFileAttached(filename);


		assert(result, `Файл ${filename} не прикреплен`);
	}
}

module.exports = new ComposeAttachesSteps();
