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
			finishButton: '[data-name=closeutil]'
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
}

module.exports = CleanerPage;
