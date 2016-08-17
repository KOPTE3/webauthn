'use strict';

let ComposeEditorControls = require('../compose/editorControls');

const ATTACH_TIMEOUT = 1000;

/** Модуль для работы с контролами страницы написания письма */
class Compose2EditorControls extends ComposeEditorControls {
	constructor () {
		super();
	}

	get locatorContainer () {
		return '.compose__toolbar-external';
	}

	get locators () {
		let container = this.locatorContainer;

		return this.extend(super.locators, {
			format: {
				inlineField: `${container} input[name="inlinefiles"]`
			}
		});
	}

	get inlineAttachField () {
		return this.page.element(this.locators.format.inlineField);
	}

	/**
	 * Прикрепление инлайн аттача через кнопку в панели написания
	 *
	 * @param {string} filepath
	 */
	attachInline (filepath) {
		const {inlineField} = this.locators.format;

		if (!this.inlineAttachField.isVisible()) {
			this.page.execute(function (selector) {
				document.querySelector(selector).style.opacity = '1';
			}, inlineField);
		}

		this.page.setValue(inlineField, filepath);
		this.page.pause(ATTACH_TIMEOUT);
	}
}

module.exports = Compose2EditorControls;
