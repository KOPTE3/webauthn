'use strict';

let MessagePage = require('../message');

/** Модуль для работы с телом письма */
class BodyPage extends MessagePage {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = `${super.locators.container} .b-letter__body__wrap`;

		return this.extend(super.locators, {
			container,
			links: `${container} a`
		});
	}

	/**
	 * Кликнуть по ссылке в письме
	 *
	 * @param {string} link - текст ссылки (не урл)
	 */
	clickLink (link) {
		let { value: links } = this.page.elements(this.locators.links);

		links.some(({ELEMENT}) => {
			let text = this.page.elementIdText(ELEMENT).value;

			if (text === link) {
				this.page.elementIdClick(ELEMENT);

				return true;
			}
		});
	}
}

module.exports = BodyPage;
