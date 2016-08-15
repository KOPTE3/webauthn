'use strict';

let assert = require('assert');

let Compose2EditorControlsPage = require('../compose2/editorControls');
let ComposeAttachesPage = require('../compose/attaches');

let compose2EditorControls = new Compose2EditorControlsPage();

const ATTACH_TIMEOUT = 1000;

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
		let attachments = `${container} .js-sliderContent .js-sliderItem`;
		let {inlineField} = compose2EditorControls.locators.format;

		/* eslint-disable max-len */
		return this.extend(super.locators, {
			container,
			inlineField,
			attachField: `${container} .compose-attachments__input`,
			cloud: `${container} [data-source="cloud"]`,
			mail: `${container} [data-source="mail"]`,
			slider: `${container} .compose-attachments__content`,
			remove: `${container} .ico_compose_remove`,
			progress: `${container} .compose-attachment__progress-mask`,
			loaded: '.compose-attachment__thumbnail',
			name: '.b-thumb__controlbar .b-filename__text',
			progressname: '.compose-attachment__progress-mask .b-filename__text',

			attachments,
			attachmentByName: filename => `//div[@class="b-slider__container js-sliderContainer"]/descendant::*[@class="b-filename__spacer"][text()="${filename}"]/ancestor::div[@class="b-slider__item js-sliderItem"]`
		});

		/* eslint-enable */
	}

	clickMail () {
		this.page.click(this.locators.mail);
	}

	get inlineAttachField () {
		return this.page.element(this.locators.inlineField);
	}

	/**
	 * Прикрепление инлайн аттача через кнопку в панели написания
	 *
	 * @param {string} filepath
	 */
	attachInline (filepath) {
		const {inlineField} = this.locators;

		if (!this.inlineAttachField.isVisible()) {
			this.page.execute(function (selector) {
				document.querySelector(selector).style.opacity = '1';
			}, inlineField);
		}

		this.page.setValue(inlineField, filepath);
		this.page.pause(ATTACH_TIMEOUT);
	}
}

module.exports = ComposeAttaches;
