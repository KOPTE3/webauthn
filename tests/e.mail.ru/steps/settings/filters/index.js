'use strict';

let assert = require('assert');

let SettingsSteps = require('..');
let FiltersPage = require('../../../pages/settings/filters');
let actions = require('../../../utils/actions');
let cleanerStore = require('../../../store/cleaner');
let helpers = require('../../../store/helpers');

let page = new FiltersPage();

class FiltersSteps extends SettingsSteps {
	static get page () {
		return page;
	}

	static registerCleanerHook () {
		actions.registerAjaxHook('maillist', function (xhr, options, stats) {
			var response = JSON.parse(xhr.responseText);

			response.body = stats;
			xhr.responseText = JSON.stringify(response);
		}, cleanerStore.stats);
	}

	static enableCleaner () {
		assert(actions.updateHelper(helpers['mailbox-sort'], {
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
