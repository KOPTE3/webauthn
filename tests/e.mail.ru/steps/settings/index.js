'use strict';

let assert = require('assert');

let Steps = require('..');
let SettingsPage = require('../../pages/settings');

class SettingsSteps extends Steps {
	static get page () {
		return new SettingsPage();
	}
}

module.exports = SettingsSteps;
