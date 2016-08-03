'use strict';

let ComposePage = require('../compose');

/** Модуль для работы с контролами страницы написания письма */
class ComposeEditorControls extends ComposePage {
	constructor () {
		super();
	}

	get locatorContainer () {
		return '.compose__editor_toolbar';
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = this.locatorContainer;

		return this.extend(super.locators, {
			container,
			links: {
				signature: `${container} .mceToolbarLink.mce_signature`,
				appearance: `${container} .mceToolbarLink.mce_design`,
				cards: `${container} .mceToolbarLink.mce_cards`,
				text: `${container} .mceToolbarLink.mce_enableTextEditor`,
				html: `${container} .mceToolbarLink.mce_moreactions`
			},
			signature: {
				container: `${container} .mceSignatureMenu`,
				selected: `${container} .mceSignatureMenu .mceSignatureSplitButtonItemSelected`,
				item: `${container} .mceSignatureMenu .mceSplitButtonItemLink`,
				itemText: `${container} .mceSignatureMenu .mceSignatureSplitButtonItemWrap`,
				text: `.mceSignatureSplitButtonItemWrap`,
				settings: `${container} .mceSignatureMenu .mceSplitButtonItemLinkAway`
			}
		});
	}

	/**
	 * Нажать на псевдоссылку
	 *
	 * @param {string} name - (signature|appearance|cards|text|html)
	 */
	clickLink (name) {
		this.page.click(this.locators.links[name]);
	}

	/**
	 * Видимость дропдауна с подписями
	 *
	 * @return {boolean}
	 */
	isVisibleSignature () {
		return this.page.waitForVisible(this.locators.signature.container);
	}

	/**
	 * В дропдауне с подписями есть подпись с заданным текстом
	 *
	 * @param {string} text - текст подписи
	 * @return {boolean}
	 */
	hasSignature (text) {
		let { value: items } = this.page.elements(this.locators.signature.itemText);
		let result = false;

		items.some(({ ELEMENT }) => {
			if (this.page.elementIdText(ELEMENT).value === text) {
				result = true;

				return true;
			}
		});

		return result;
	}

	/**
	 * Получить текст выбранной подписи
	 *
	 * @return {string}
	 */
	getSelectedSignatureText () {
		let selectedItem = this.page.element(this.locators.signature.selected);
		let textItem = this.page.elementIdElement(selectedItem.value.ELEMENT,
			this.locators.signature.text);

		return textItem.getText();

	}

	/**
	 * В дропдауне подписей есть ссылка на настройки
	 *
	 * @return {boolean}
	 */
	isSignatureHasSettingsLink () {
		return this.page.isVisible(this.locators.signature.settings);
	}
}

module.exports = ComposeEditorControls;
