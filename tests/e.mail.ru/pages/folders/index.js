'use strict';

let PageObject = require('../../pages');

/** Модуль для работы с представлением списка папок */
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
		return '/messages/inbox';
	}

	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return {
			datalist: '.b-datalists', // TODO: заюзать locator из messages
			container: '.b-nav_folders',
			item: '.b-nav__item[data-id]',
			parent: '.b-nav__subitems[data-parent]',
			textItem: '.b-nav__item__text'
		};
	}

	getFoldersContainer () {
		return this.page.element(this.locators.container);
	}

	getParentFolderItem (folderId) {
		return this.getFoldersContainer()
			.element(this.locators.parent + '[data-parent="' + folderId + '"]');
	}

	getFolderItem (folderId) {
		return this.getFoldersContainer()
			.element(this.locators.item + '[data-id="' + folderId + '"]');
	}

	isFolderVisible (folderId) {
		let item = this.getFolderItem(folderId);

		return this.page.elementIdDisplayed(item.value.ELEMENT).value;
	}

	isFolderHidden (folderId) {
		return !this.isFolderVisible(folderId);
	}

	goToFolder (folderId) {
		let item = this.getFolderItem(folderId);

		this.page.elementIdClick(item.value.ELEMENT);
		this.page.waitForExist(this.locators.datalist
			+ ' [data-cache-key="' + folderId + '_undefined_false"]');
	}

	setOffsetTime (offset) {
		return this.page.execute((offset) => {
			Date._getUnixtime = Date.getUnixtime;

			Date.getUnixtime = function () {
				return Date._getUnixtime() + offset;
			};
		}, offset);
	}

	resetOffsetTime () {
		return this.page.execute(() => {
			if (Date._getUnixtime) {
				Date.getUnixtime = Date._getUnixtime;
			}
		});
	}

	getData (container, element, parent) {
		let id = container.elementIdAttribute(element, 'data-id').value;
		let textElement = container.elementIdElement(element, this.locators.textItem);

		return {
			id,
			name: textElement.getText(),
			parent
		};
	}

	getList () {
		let list = [];
		let container = this.page.element(this.locators.container);

		/*
		container.elements('>' + this.locators.item).value.forEach(item => {

			let parent = container.elementIdAttribute(item.ELEMENT, 'data-parent').value;

			if (parent) {
				list.push(this.getData(container, item.ELEMENT, parent));
			} else {
				list.push(this.getData(container, item.ELEMENT, '-1'));
			}
		});
		*/

		/*
		container.elements('>' + this.locators.item).value.forEach(item => {
			list.push(this.getData(container, item.ELEMENT, '-1'));
		});

		container.elements('>' + this.locators.parent).value.forEach(item => {

			let parent = container.elementIdAttribute(item.ELEMENT, 'data-parent').value;

			container.elementIdElements(item.ELEMENT, this.locators.item).value.forEach(item => {
				list.push(this.getData(container, item.ELEMENT, parent));
			});
		});

		console.log(list);
		*/
		return list;
	}
}

module.exports = FoldersPage;
