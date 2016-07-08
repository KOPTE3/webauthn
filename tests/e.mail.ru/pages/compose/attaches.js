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
		let container = '.compose-attachments';
		let attachments = '//*[contains(@class, "js-content")]';

		return this.extend(super.locators, {
			container,
			attachField: `${container} .compose-attachments__input`,
			cloud: `${container} [data-source="cloud"]`,
			mail: `${container} [data-source="mail"]`,
			slider: `${container} .compose-attachments__content`,
			remove: `${container} .ico_compose_remove`,
			progress: `${container} .compose-attachment__progress-mask`,

			attachments,
			attachmentByName: filename => `${attachments}[.//*[text()="${filename}"]]`
		});
	}

	waitSlider () {
		this.page.waitForExist(this.locators.slider);
		
		return this.page.isVisible(this.locators.slider);
	}

	uploadAttach (filepath) {
		const {attachField} = this.locators;

		if (!this.attachField.isVisible()) {
			this.page.execute(function (selector) {
				document.querySelector(selector).style.opacity = '1';
			}, attachField);
		}

		this.page.chooseFile(this.locators.attachField, filepath);
	}

	isFileLoading (filename) {
		let selector = this.locators.attachmentByName(filename);
		let file = this.page.element(selector);

		return file.element(this.locators.progress).isVisible();
	}

	isFileAttached (filename) {
		let selector = this.locators.attachmentByName(filename);
		let files = this.page.elements(selector);

		return files.value.length > 0;
	}

	removeAttach (filename) {
		let selector = this.locators.attachmentByName(filename);
		let file = this.page.element(selector);

		file.click(this.locators.remove);
	}

	get slider () {
		return this.page.element(this.locators.slider);
	}

	get attachField () {
		return this.page.element(this.locators.attachField);
	}

}

module.exports = ComposeAttaches;
