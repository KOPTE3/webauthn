'use strict';

let assert = require('assert');

let CleanerPage = require('../../pages/layers/cleaner');
let LayerSteps = require('.');

let page = new CleanerPage();

class CleanerSteps extends LayerSteps {
	static get page () {
		return page;
	}

	static waitForCleaner () {
		this.page.waitForCleaner();
	}
}

module.exports = CleanerSteps;
