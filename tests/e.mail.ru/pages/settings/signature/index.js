'use strict';

let PageObject = require('../../../pages');

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
				wysiwyg: `${container} .js-signature-container .mceExternalToolbar`
			},
			controls: {
				new: `${container} .js-add-signature`,
				save: `${container} [type="submit"]`
			}
		};
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
			element.element('.js-editor-contaner textarea').setValue(params.body);
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
		let { value: signatures } = this.page.elements(this.locators.item.signature);
		let result = false;

		signatures.some(({ ELEMENT}) => {
			if (this.page.elementIdText(ELEMENT).value === signature) {
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
