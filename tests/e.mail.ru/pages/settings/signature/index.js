'use strict';

let PageObject = require('../../../pages');
let ComposeEditor = require('../../../pages/compose/editor');
let composeEditor = new ComposeEditor();

class SignaturePage extends PageObject {
	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/settings/signature';
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '#options-form-signature';

		return {
			container,
			item: {
				container: `${container} .js-signature-container`,
				controls: {
					remove: '.js-remove'
				},
				signature: `${container} .js-signature-container textarea`,
				editor: `${container} .js-signature-container .form__editor`,
				wysiwyg: `${container} .js-signature-container .mceExternalToolbar`
			},
			controls: {
				new: `${container} .js-add-signature`,
				save: `${container} [type="submit"]`
			}
		};
	}

	/**
	 * Проверка что это html подпись
	 *
	 * @return {boolean}
	 */
	isWysiwygSignature () {
		return this.page.isExisting(this.locators.item.editor);
	}

	/**
	 * Получить значение подписи
	 *
	 * @param {number} [index] - (1|2|3), не с 0!
	 * @return {string}
	 */
	getSignatureValue (index = 1) {
		let value;

		if (this.isWysiwygSignature()) {
			let editor = composeEditor.getEditor(index - 1);

			value = editor.getText();
			composeEditor.restoreParentFrame();
		} else {
			let locator = `${this.locators.item.container}:nth-of-type(${index})`;
			let container = this.page.element(locator);

			value = container.element(this.locators.item.signature).getText();
		}

		return value;
	}

	/**
	 * Поставить значение подписи. С учетом того, что может быть включена html-подпись
	 *
	 * @param {string} value
	 * @param {number} [index] - (1|2|3), не с 0!
	 */
	setSignatureValue (value, index = 1) {
		if (this.isWysiwygSignature()) {
			let editor = composeEditor.getEditor(index - 1);

			editor.setValue(value);
			composeEditor.restoreParentFrame();
		} else {
			let locator = `${this.locators.item.container}:nth-of-type(${index})`;
			let container = this.page.element(locator);

			container.element(this.locators.item.signature).setValue(value);
		}
	}

	createSignature (params) {
		let { item } = this.locators;
		let items = this.page.elements(item.container);

		this.clickControl('new');

		let currentIndex = 1;

		items.value.forEach((value, index) => {
			let actual = this.page.elementIdDisplayed(value.ELEMENT);

			if (actual.value) {
				currentIndex = index + 1;
			}
		});

		let locator = `.//*[contains(@class, "js-signature-container")][${currentIndex}]`;
		let element = this.page.element(locator);

		if ('name' in params) {
			element.element('.js-realname').setValue(params.name);
		}

		if ('body' in params) {
			this.setSignatureValue(params.body, currentIndex);
		}

		if (params.selected) {
			let checkbox = element.element('.js-default');

			this.page.moveTo(checkbox.value.ELEMENT, 1, 1);
			this.page.leftClick();
		}
	}

	removeAllSignatures () {
		let { container, item } = this.locators;

		let items = this.page.elements(`${container} ${item.controls.remove}`);

		items.value.forEach(value => {
			let actual = this.page.elementIdDisplayed(value.ELEMENT);

			if (actual.value) {
				this.page.elementIdClick(value.ELEMENT);
			}
		});
	}

	clickControl (name) {
		this.page.click(this.locators.controls[name]);
	}

	/**
	 * Среди подписей есть подпись с заданным  текстом
	 *
	 * @param {string} signature
	 * @return {boolean}
	 */
	hasSignature (signature) {
		let { value: signatures } = this.page.elements(this.locators.item.container);
		let result = false;

		signatures.some((item, index) => {
			if (this.getSignatureValue(index + 1) === signature) {
				result = true;

				return true;
			}
		});

		return result;
	}

	/**
	 * Дождаться видимости редактора
	 *
	 * @return {boolean}
	 */
	hasWysiwyg () {
		return this.page.waitForVisible(this.locators.item.wysiwyg);
	}
}

module.exports = SignaturePage;
