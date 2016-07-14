'use strict';

let LayersPage = require('..');

let foldersStore = require('../../store/folders');

/** Модуль для работы с лаером разбериящика */
class CleanerPage extends LayersPage {
	/**
	 * Локаторы
	 *
	 * @type {Object}
	 */
	get locators () {
		return this.extend(super.locators, {
			container: 'body',
			cleaner: '.js-cleaner',
			mainPage: '.js-cleaner-main',
			resultPage: '.js-cleaner-result',
			processButton: '[data-name=process]',
			finishButton: '[data-name=closeutil]',

			archiveLabel: '.js-archive',
			archiveGraphBranch: '.js-branch',

			category: '.js-category',
			categoryHead: '.js-category-head',
			categoryDelete: '.js-category-delete',
			categoryText: '.js-category-text',
			categoryDropdown: '.cleaner-dropdown__list',

			phantom: '.js-phantom',

			source: '.js-source',

			dropPlaceholder: '.js-drop-placeholder'
		});
	}

	waitForCleaner () {
		this.page.waitForVisible(this.locators.cleaner);
	}

	waitForCleanerMain () {
		this.page.waitForVisible(this.locators.mainPage);
	}

	waitForCleanerResult () {
		this.page.waitForVisible(this.locators.resultPage);
	}

	clickProcessButton () {
		this.page.click(this.locators.processButton);
	}

	clickFinishButton () {
		this.page.click(this.locators.finishButton);
	}

	clickPhantom () {
		this.page.click(this.locators.phantom + ' ' + this.locators.categoryText);
	}

	hoverOnCategory (categoryId) {
		this.page.moveToObject(this.locators.category +
			`[data-category-id="${categoryId}"] ` +
			this.locators.categoryHead);
	}

	clickDeleteCategoryButton (categoryId) {
		this.page.click(this.locators.category +
			`[data-category-id="${categoryId}"] ` +
			this.locators.categoryDelete);
	}

	dragFromInboxToSpam () {
		let itemLocator = this.locators.category +
			`[data-folder-id="${foldersStore.ids.inbox}"] ` +
			this.locators.source;

		let targetLocator = this.locators.category +
			`[data-folder-id="${foldersStore.ids.spam}"]`;

		// Драг-н-дроп из коробки не работает.
		// this.page.dragAndDrop(itemLocator, targetLocator);

		this.page.moveToObject(itemLocator);
		this.page.buttonDown();
		this.page.moveToObject(targetLocator, 10, 10);
		this.page.moveToObject(targetLocator, 20, 20); // надо немножко подвинуться :)
		this.page.buttonUp();
	}

	openDropdown (categoryId, folderId) {
		this.page.click(this.locators.category +
			`[data-category-id="${categoryId}"] ` +
			this.locators.categoryText);
	}

	clickDropdownFolder (categoryId, folderId) {
		this.page.click(this.locators.category +
			`[data-category-id="${categoryId}"] [data-id="${folderId}"]`);
	}

	isArchiveLabelVisible () {
		let element = this.getContainerElement()
			.element(this.locators.archiveLabel);

		return this.page.elementIdDisplayed(element.value.ELEMENT).value;
	}

	isArchiveGraphBranchVisible (number) {
		let element = this.getContainerElement()
			.element(this.locators.archiveGraphBranch + `:nth-child(${number}`);

		return this.page.elementIdDisplayed(element.value.ELEMENT).value;
	}
}

module.exports = CleanerPage;
