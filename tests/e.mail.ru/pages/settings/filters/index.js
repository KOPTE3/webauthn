'use strict';

let SettingsPage = require('..');

class FiltersPage extends SettingsPage {
	get location () {
		return '/settings/filters';
	}
}

module.exports = SettingsPage;
