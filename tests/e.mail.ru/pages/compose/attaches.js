'use strict';

let assert = require('assert');

let ComposePage = require('../compose');

/** Модуль для работы с прикреплением файлов написания письма */
class ComposeAttaches extends ComposePage {
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
		let container = '.compose__header__row_uploader';
		let attachments = '.js-file';
		let loaded = '.upload__file_loaded';

		/* eslint-disable max-len */
		return this.extend(super.locators, {
			container,
			attachField: `${container} .compose__uploader__input`,
			cloud: `${container} .js-multi-attach`,
			slider: `${container} .js-attachments`,
			remove: `${container} .upload__file__ico_del`,
			progress: `${container} .upload__file__progress`,
			loaded: '.js-ok',

			attachments,
			attachmentName: `${attachments} .upload__file__name`,
			attachmentByName: filename => `${attachments}[data-title="${filename}"],${attachments}[title="${filename}"]`
		});

		/* eslint-enable */
	}

	getAttach (filename) {
		return this.page.element(this.locators.attachmentByName(filename));
	}

	uploadAttach (filepath) {
		const {attachField} = this.locators;

		if (!this.attachField.isVisible()) {
			this.page.execute(function (selector) {
				document.querySelector(selector).style.opacity = '1';
			}, attachField);
		}

		this.page.setValue(this.locators.attachField, filepath);
	}

	/**
	 * Проверка прикрепленности файла
	 * @param {string} filename
	 * @param {boolean} reverse - проверить, что файла нет
	 * @return {boolean}
	 */
	isFileAttached (filename, reverse = false) {
		let file = this.getAttach(filename);

		if (!file.value) {
			return reverse;
		}

		try {
			if (reverse) {
				return this.page.waitUntil(() => !file.isVisible());
			} else {
				let loaded = this.page.elementIdElement(file.value.ELEMENT, this.locators.loaded);

				return loaded.waitForVisible();
			}

		} catch (error) {
			console.log('error', error);

			return false;
		}
	}

	removeAttach (filename) {
		let file = this.getAttach(filename);
		let remove = this.page.elementIdElement(file.value.ELEMENT, this.locators.remove);

		this.page.elementIdClick(remove.value.ELEMENT);
	}

	get slider () {
		return this.page.element(this.locators.slider);
	}

	/**
	 * Видимость слайдера
	 * @return {boolean}
	 */
	isVisibleSlider () {
		return this.slider.isVisible();
	}

	get attachField () {
		return this.page.element(this.locators.attachField);
	}

	/**
	 * Наличие инпута загрузки файла
	 * @return {boolean}
	 */
	hasAttachField () {
		return this.attachField.isExisting();
	}

	clickCloud () {
		this.page.click(this.locators.cloud);
	}
}

module.exports = ComposeAttaches;
