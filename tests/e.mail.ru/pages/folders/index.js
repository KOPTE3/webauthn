'use strict';

let PageObject = require('../../pages');
let MessagesPage = require('../../pages/messages');

/** Модуль для работы с представлением списка папок */
class FoldersPage extends PageObject {
	constructor () {
		super();

		this.messagesPage = new MessagesPage();
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
			container: '.b-nav_folders',
			datalist: this.messagesPage.locators.container,
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
}

module.exports = FoldersPage;
