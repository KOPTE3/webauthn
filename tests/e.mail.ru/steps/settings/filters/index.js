'use strict';

let assert = require('assert');

let SettingsSteps = require('..');
let FiltersPage = require('../../../pages/settings/filters');

class FiltersSteps extends SettingsSteps {
	static get page () {
		return new FiltersPage();
	}

	static waitForUtility () {
		this.page.waitForVisible('.asd');
	}

	static click () {
		this.page.click('.js-mailbox-sort');
	}
}

module.exports = FiltersSteps;
