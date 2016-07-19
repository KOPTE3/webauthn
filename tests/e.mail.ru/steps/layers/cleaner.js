'use strict';

let assert = require('assert');

let CleanerPage = require('../../pages/layers/cleaner');
let LayerSteps = require('../layers');

let page = new CleanerPage();

class CleanerSteps extends LayerSteps {
	static get page () {
		return page;
	}

	static launchCleanerInternally () {
		browser.execute(function () {
			require(['patron.v2.layer/patron.layer.Cleaner'], function (cleaner) {
				cleaner.showLayer();
			});
		});
	}

	static waitForCleaner () {
		this.page.waitForCleaner();
	}

	static waitForCleanerMain () {
		this.page.waitForCleanerMain();
	}

	static waitForCleanerResult () {
		this.page.waitForCleanerResult();
	}

	static process () {
		this.page.clickProcessButton();
	}

	static finish () {
		this.page.clickFinishButton();
	}

	static createFolder () {
		this.page.clickPhantom();
	}

	static removeFolder (categoryId) {
		this.page.hoverOnCategory(categoryId);
		this.page.clickDeleteCategoryButton(categoryId);
	}

	static selectFolder (categoryId, folderId) {
		this.page.openDropdown(categoryId);
		this.page.clickDropdownFolder(categoryId, folderId);
	}

	static dragFromInboxToSpam () {
		this.page.dragFromInboxToSpam();
	}

	static isArchiveLabelVisible () {
		let actual = this.page.isArchiveLabelVisible();

		assert(actual, `Значок архива должен быть виден`);
	}

	static isArchiveLabelNotVisible () {
		let actual = this.page.isArchiveLabelVisible();

		assert(!actual, `Значок архива должен быть скрыт`);
	}

	static isArchiveGraphBranchVisible (number) {
		let actual = this.page.isArchiveGraphBranchVisible(number);

		assert(actual, `Линия ${number} должна быть видна`);
	}

	static isArchiveGraphBranchNotVisible (number) {
		let actual = this.page.isArchiveGraphBranchVisible(number);

		assert(!actual, `Линия ${number} должна быть скрыта`);
	}
}

module.exports = CleanerSteps;
