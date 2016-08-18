'use strict';

let PageObject = require('../../../pages');
let SignatureEditor = require('../../../pages/settings/signature/editor');
let signatureEditors = [new SignatureEditor(0), new SignatureEditor(1), new SignatureEditor(2)];

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
					remove: '.js-remove',
					defaultName: '.js-set-default-name'
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
	 * Получить контейнер с именем-подписью
	 *
	 * @param {number} index
	 * @return {Element}
	 */
	getSignatureContainer (index = 0) {
		let locator = `${this.locators.item.container}:nth-of-type(${index + 1})`;

		return this.page.element(locator);
	}

	/**
	 * Получить значение подписи
	 *
	 * @param {number} [index] - (0|1|2)
	 * @return {string}
	 */
	getSignatureValue (index = 0) {
		let value;

		if (this.isWysiwygSignature()) {
			let editor = signatureEditors[index].getEditor();

			value = editor.getText();
			signatureEditors[index].restoreParentFrame();
		} else {
			let container = this.getSignatureContainer(index);

			value = container.element(this.locators.item.signature).getText();
		}

		return value;
	}

	/**
	 * Поставить значение подписи. С учетом того, что может быть включена html-подпись
	 *
	 * @param {string} value
	 * @param {number} [index] - (0|1|2)
	 */
	setSignatureValue (value, index = 0) {
		if (this.isWysiwygSignature()) {
			let editor = signatureEditors[index].getEditor();

			editor.setValue(value);
			signatureEditors[index].restoreParentFrame();
		} else {
			let container = this.getSignatureContainer(index);

			container.element(this.locators.item.signature).setValue(value);
		}
	}

	/**
	 * Индекс последней видимой подписи
	 *
	 * @type {number} - (0|1|2)
	 */
	get currentIndex () {
		let items = this.page.elements(item.container);
		let currentIndex = 0;

		items.value.forEach((value, index) => {
			let actual = this.page.elementIdDisplayed(value.ELEMENT);

			if (actual.value) {
				currentIndex = index;
			}
		});

		return currentIndex;
	}

	/**
	 * Нажать "добавить подпись" и поставить там дефолтное имя
	 */
	addSignature () {
		let container;

		this.clickControl('new');
		container = this.getSignatureContainer(this.currentIndex);
		container.click(this.locators.item.controls.defaultName);
	}

	createSignature (params) {
		let { item } = this.locators;

		this.clickControl('new');

		let currentIndex = this.currentIndex;

		let locator = `.//*[contains(@class, "js-signature-container")][${currentIndex + 1}]`;
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
			if (this.getSignatureValue(index) === signature) {
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
