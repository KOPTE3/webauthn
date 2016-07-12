'use strict';

let assert = require('assert');

let CleanerPage = require('../../pages/layers/cleaner');
let LayerSteps = require('../layers');

let page = new CleanerPage();

class CleanerSteps extends LayerSteps {
	static get page () {
		return page;
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

	static removeFolder (categoryId) {
		this.page.hoverOnCategory(categoryId);
		this.page.clickDeleteCategoryButton(categoryId);
	}

	static dragFromInboxToSpam () {
		this.page.dragFromInboxToSpam();
	}
}

module.exports = CleanerSteps;
