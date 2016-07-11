'use strict';

let SettingsPage = require('..');
let Page = require('../..');

// class FiltersPage extends SettingsPage {
class FiltersPage extends Page {
	get location () {
		return '/settings/filters';
	}

	get locators () {
		return {
			container: '#LEGO',
			cleanerWidget: '.b-cleaner-widget',
			cleanerLaunchButton: '.js-mailbox-sort',
			cleanerCancelButton: '.js-autofilter-abort'
		};
	}

	waitForCleanerWidget () {
		this.page.waitForVisible(this.locators.cleanerWidget);
	}

	clickCleanerLaunchButton () {
		this.page.click(this.locators.cleanerLaunchButton);
	}

	clickCleanerCancelButton () {
		this.page.click(this.locators.cleanerCancelButton);
	}
}

module.exports = FiltersPage;
