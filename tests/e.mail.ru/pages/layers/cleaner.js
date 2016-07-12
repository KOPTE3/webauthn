'use strict';

let LayersPage = require('..');

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

			category: '.js-category',
			categoryHead: '.js-category-head',
			categoryDelete: '.js-category-delete',
			categoryText: '.js-category-text',
			categoryDropdown: '.cleaner-dropdown__list'
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

	hoverOnCategory (categoryId) {
		this.page.moveToObject(this.locators.category + `[data-category-id="${categoryId}"] ` + this.locators.categoryHead);
	}

	clickDeleteCategoryButton (categoryId) {
		this.page.click(this.locators.category + `[data-category-id="${categoryId}"] ` + this.locators.categoryDelete);
	}
}

module.exports = CleanerPage;
