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
			toggler: '[data-name="toggle-folding"]',
			filters: {
				'unread': `${container} a[href*="q_read"]`,
				'flag': `${container} a[href*="q_flag"]`,
				'attach': `${container} a[href*="q_attach"]`
			}
		};
	}

	getFolderItemLocator (folderId) {
		let {container, item} = this.locators;

		return `${container} ${item}[data-id="${folderId}"]`;
	}

	getFolderLinkLocator (folderId) {
		return `${this.getFolderItemLocator(folderId)} a`;
	}

	getDatalistLocator (folderId) {
		return `${this.locators.datalist} [data-cache-key="${folderId}_undefined_false"]`;
	}

	getFolderParentLocator (folderId) {
		let {container, parent} = this.locators;

		return `${container} ${parent}[data-parent="${folderId}"]`;
	}

	getFoldersContainer () {
		let {container} = this.locators;

		return this.page.element(container);
	}

	getParentFolderItem (folderId) {
		return this.page.element(this.getFolderParentLocator(folderId));
	}

	getFolderToggler (folderId) {
		return this.getFolderItem(folderId)
			.element(this.locators.toggler);
	}

	getFolderItem (folderId) {
		return this.page.element(this.getFolderItemLocator(folderId));
	}

	isFolderVisible (folderId) {
		let locator = this.getFolderItemLocator(folderId);

		return this.page.isVisible(locator);
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

	isFolderCollapsed (folderId) {
		return !this.isFolderExpanded(folderId);
	}

	isFolderExpanded (folderId) {
		let locator = this.getFolderParentLocator(folderId);

		return this.page.isVisible(locator);
	}

	expandFolder (folderId) {
		if (this.isFolderCollapsed(folderId)) {
			this.toggleFolder(folderId);

			this.page.waitUntil(() => {
				return this.isFolderExpanded(folderId);
			}, 3000, 'Не дождались раскрытия папки');
		}
	}

	collapseFolder (folderId) {
		if (this.isFolderExpanded(folderId)) {
			this.toggleFolder(folderId);

			this.page.waitUntil(() => {
				return this.isFolderCollapsed(folderId);
			}, 3000, 'Не дождались схлопывания папки');
		}
	}

	toggleFolder (folderId) {
		let toggler = this.getFolderToggler(folderId);

		this.page.elementIdClick(toggler.value.ELEMENT);
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
		this.page.waitForExist(datalistLocator, 3000);
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
