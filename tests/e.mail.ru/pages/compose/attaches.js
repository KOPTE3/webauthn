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

		return this.extend(super.locators, {
			container,
			attachField: `${container} .compose__uploader__input`,
			cloud: `${container} [data-title="Файлы из Облака и Почты"]`,
			slider: `${container} .js-attachments`,
			remove: `${container} .upload__file__ico_del`,
			progress: `${container} .upload__file__progress`,

			attachments,
			attachmentByName: filename => `${attachments}[data-title="${filename}"]`
		});
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

		let f = this.page.elements(this.locators.attachments);
		console.log(files);
		console.log(f);


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
		console.log(this.page.element(this.locators.attachField));
		return this.page.element(this.locators.attachField);
	}

}

module.exports = ComposeAttaches;
