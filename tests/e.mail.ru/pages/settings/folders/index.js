'use strict';

let PageObject = require('../../../pages');

class FoldersPage extends PageObject {
	constructor () {
		super();
	}

	/**
	 * Базовый адрес страницы
	 *
	 * @type {string}
	 */
	get location () {
		return '/settings/folders';
	}

	/**
	 *
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			container: '.b-folders',
			item: '.b-folders__item',
			itemWithParam: '.b-folders__item-col_title'
		};
	}

	getList () {
		let list = [];
		let container = this.page.element(this.locators.container);
		let elements = container.elements(this.locators.item);

		elements.value.forEach(item => {
			let element = container.elementIdElement(item.ELEMENT, this.locators.itemWithParam);
			let id = element.getAttribute('data-id');
			let parent = element.getAttribute('data-parent');
			let name = element.getText();

			list.push({
				id,
				name,
				parent
			});
		});

		return list;
	}

	waitAddSuccess (data) {

		// this.page.waitForExist(this.locators.container + ' ' + this.locators.item
		// 	+ ' [data-parent="' + data.parent + '"]');

		/*
		this.page.waitUntil(() => {
			return this.getList().find(function (item) {
				return item.parent === data.parent && item.name === data.name;
			});
		});
		*/
	}
}

module.exports = FoldersPage;
