'use strict';

let assert = require('assert');

let ComposeAttachesPage = require('../compose/attaches');

/** Модуль для работы с прикреплением файлов написания письма */
class ComposeAttaches extends ComposeAttachesPage {
	constructor () {
		super();
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '.compose-attachments';
		let attachments = `${container} .js-sliderItem`;

		return this.extend(super.locators, {
			container,
			attachField: `${container} .compose-attachments__input`,
			cloud: `${container} [data-source="cloud"]`,
			mail: `${container} [data-source="mail"]`,
			slider: `${container} .compose-attachments__content`,
			remove: `${container} .ico_compose_remove`,
			progress: `${container} .compose-attachment__progress-mask`,
			loaded: '.compose-attachment__thumbnail',
			name: '.b-thumb__controlbar .b-filename__text',
			progressname: '.compose-attachment__progress-mask .b-filename__text',

			attachments
		});
	}

	getAttach (filename) {
		let {value: files} = this.page.elements(this.locators.attachments);
		let file = { value: null };

		files.some(({ ELEMENT }) => {
			let name = this.page.elementIdElement(ELEMENT, this.locators.name);

			if (name.value) {
				// Нужно навести курсор на аттач, чтобы показалось имя
				name.moveToObject();

				if (!name.getText()) {
					// возможно, аттач еще не загрузился, тогда имя нужно искать в другом месте:
					name = this.page.elementIdElement(ELEMENT, this.locators.progressname);
				}

				if (name.getText().replace('\n', '') === filename) {
					file.value = { ELEMENT };

					return true;
				}
			}
		});

		return file;
	}

	clickMail () {
		this.page.click(this.locators.mail);
	}
}

module.exports = ComposeAttaches;
