'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с портальным меню (синей шапкой) */
class PortalMenuPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		let container = '#portal-menu';
		let more = `${container} .pm-toolbar__button[data-name="ph-more"] .pm-toolbar__dropdown`;

		/* eslint-disable max-len */
		return {
			container,
			buttons: new Proxy({}, {
				get (target, name) {
					return `${container} .pm-toolbar__button[data-name="ph-${name}"]`;
				}
			}),
			more,
			moreItems: new Proxy({}, {
				get (target, name) {
					if (name === 'all') {
						return `${more} .pm-toolbar__dropdown__item:not([style*="display: none"])`;
					} else {
						name = name.replace('ph-', '');

						return `${more} .pm-toolbar__dropdown__item[data-name="ph-${name}"]`;
					}
				}
			})
		};

		/* eslint-enable */
	}

	/**
	 * Нажать на кнопку
	 *
	 * @param {string} name - (inbox|addressbook|files|themes|settings|blog|help|videohelp|
	 * mobile|biz|agent|more|calendar|cloud)
	 */
	clickButton (name) {
		this.page.click(this.locators.buttons[name]);
	}

	/**
	 * Видимость меню "Ещё"
	 *
	 * @return {boolean}
	 */
	isMoreVisible () {
		return this.page.isVisible(this.locators.more);
	}

	/**
	 * Список имен
	 *
	 * @type {string[]}
	 */
	get moreItems () {
		let { value: items } = this.page.elements(this.locators.moreItems.all);

		return items.map(({ ELEMENT }) => {
			return this.page.elementIdAttribute(ELEMENT, 'data-name').value;
		});
	}

	isMoreItemVisible (name) {
		return this.page.isVisible(this.locators.moreItems[name]);
	}

	/**
	 * Навестись мышкой на элемент в списке "Ещё"
	 * @param {string} name
	 * @param {string} position (top|center|bottom) - навести на
	 * верхний левый угол/центр/нижний правый
	 */
	selectMoreItem (name, position = 'center') {
		let xoffset, yoffset;

		if (position === 'top') {
			xoffset = yoffset = 1;
		} else if (position === 'bottom') {
			let { width, height} = this.page.getElementSize(this.locators.moreItems[name]);

			xoffset = width - 1;
			yoffset = height - 1;
		}

		this.page.moveToObject(this.locators.moreItems[name], xoffset, yoffset);
	}

	/**
	 * Выбран ли данный пункт меню "Ещё"
	 *
	 * @param {string} name
	 * @return {boolean}
	 */
	isMoreItemSelected (name) {
		let hover = 'pm-toolbar__dropdown__item_hover';

		return this.page.waitUntil(() => {
			return this.page.hasClass(this.locators.moreItems[name], hover);
		}, 1000, `Элемент ${name} чем-то перекрыт`);
	}
}

module.exports = PortalMenuPage;
