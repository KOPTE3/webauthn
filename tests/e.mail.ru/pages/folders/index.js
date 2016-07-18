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
		let container = '.b-nav_folders';

		return {
			container,
			datalist: this.messagesPage.locators.container,
			item: '.b-nav__item[data-id]',
			parent: '.b-nav__subitems[data-parent]',
			textItem: '.b-nav__item__text',
			filters: {
				'unread': `${container} a[href*="q_read"]`,
				'flag': `${container} a[href*="q_flag"]`,
				'attach': `${container} a[href*="q_attach"]`
			}
		};
	}

	getFolderLocator (folderId) {
		let {container, item} = this.locators;

		return `${container} ${item}[data-id="${folderId}"]`;
	}

	getFolderLinkLocator (folderId) {
		return `${this.getFolderLocator(folderId)} a`;
	}

	getDatalistLocator (folderId) {
		let {datalist} = this.locators;

		return `${datalist} [data-cache-key="${folderId}_undefined_false"]`;
	}

	getFoldersContainer () {
		let {container} = this.locators;

		return this.page.element(container);
	}

	getParentFolderItem (folderId) {
		return this.getFoldersContainer()
			.element(`${this.locators.parent}[data-parent="${folderId}"]`);
	}

	getFolderItem (folderId) {
		return this.getFoldersContainer()
			.element(`${this.locators.item}[data-id="${folderId}"]`);
	}

	isFolderVisible (folderId) {
		let item = this.getFolderItem(folderId);

		return this.page.elementIdDisplayed(item.value.ELEMENT).value;
	}

	isFolderExists (folderId) {
		let item = this.getFolderItem(folderId);

		return item.state === 'success';
	}

	isFolderIn (folderId, parentId) {
		let item;

		if (parentId === '-1') {
			item = this.getFoldersContainer()
				.element(`./*[@data-id = ${folderId}]`);
		} else {
			item = this.getFoldersContainer()
				.element(`.//*[@data-parent = ${parentId}][.//*[@data-id = ${folderId}]]`);
		}

		return item.state === 'success';
	}

	getArchiveFolderId () {
		let item = this.getFoldersContainer()
			.element('.//*[@data-id][.//i[contains(@class, "ico_folder_archive")]]');

		return (item.state === 'success') &&
			this.page.elementIdAttribute(item.value.ELEMENT, 'data-id').value;
	}

	goToFolder (folderId) {
		// let item = this.getFolderItem(folderId);
		let linkLocator = this.getFolderLinkLocator(folderId);
		let datalistLocator = this.getDatalistLocator(folderId);

		this.page.execute(function (selector) {
			$(selector).trigger(new $.Event({
				type: 'click',
				which: 1
			}));
		}, linkLocator);

		// this.page.elementIdClick(item.value.ELEMENT); // не работает с подпапками
		this.page.waitForExist(datalistLocator);
	}

	/**
	 * Нажать на фильтр
	 *
	 * @param {string} name - (unread|flag|attach)
	 */
	clickFilter (name) {
		this.page.click(this.locators.filters[name]);
	}
}

module.exports = FoldersPage;
