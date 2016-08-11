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
		let attachments = `${container} .js-sliderContent .js-sliderItem`;

		/* eslint-disable max-len */
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

			attachments,
			attachmentByName: filename => `//div[@class="b-slider__container js-sliderContainer"]/descendant::*[@class="b-filename__spacer"][text()="${filename}"]/ancestor::div[@class="b-slider__item js-sliderItem"]`
		});

		/* eslint-enable */
	}

	clickMail () {
		this.page.click(this.locators.mail);
	}
}

module.exports = ComposeAttaches;
