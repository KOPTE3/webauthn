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

		return this.extend(super.locators, {
			container,
			attachField: `${container} .compose__uploader__input`,
			cloud: `${container} [data-title="Файлы из Облака и Почты"]`,
			slider: `${container} .js-attachments`,
			remove: `${container} .upload__file__ico_del`,
			progress: `${container} .upload__file__progress`,

			attachments,
			attachmentName: `${attachments} .upload__file__name`,
			attachmentByName: filename => `${attachments}[data-title="${filename}"]`,
			loadedAttachmentByName: filename => `${attachments}${loaded}[data-title="${filename}"]`
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

	isFileAttached (filename) {
		let selector = this.locators.attachmentName;
		let names;
		let file;

		try {
			this.page.waitForExist(selector);
			names = this.page.getText(selector);

			if (typeof names === 'string') {
				names = [names];
			}

			file = names.find(name => {
				return name === filename;
			});

			return file;
		} catch (error) {
			console.log('error', error);

			return false;
		}
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
