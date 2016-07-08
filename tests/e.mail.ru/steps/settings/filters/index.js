'use strict';

let assert = require('assert');

let FiltersPage = require('../../../pages/settings/filters');
let SettingsSteps = require('..');

let actions = require('../../../utils/actions');

let cleanerStore = require('../../../store/cleaner');

let page = new FiltersPage();

class FiltersSteps extends SettingsSteps {
	static get page () {
		return page;
	}

	static registerHook () {
		actions.registerAjaxHook('maillist', function (xhr, options, stats) {
			var response = JSON.parse(xhr.responseText);

			response.body = stats;
			xhr.responseText = JSON.stringify(response);
		}, cleanerStore.stats);
	}

	static enableCleaner () {
		assert(actions.updateHelper(33, {
			state: true
		}), 'Cleaner helper update failed');
	}

	static waitForCleaner () {
		this.page.waitForCleanerWidget();
	}

	static launchCleaner () {
		this.page.clickCleanerLaunchButton();
	}

	static cancelCleaner () {
		this.page.clickCleanerCancelButton();
	}
}

module.exports = FiltersSteps;
