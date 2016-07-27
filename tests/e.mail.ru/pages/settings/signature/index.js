'use strict';

let PageObject = require('../../../pages');

class FoldersPage extends PageObject {
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
				}
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
}

module.exports = FoldersPage;
