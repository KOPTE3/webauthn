'use strict';

let assert = require('assert');

let Steps = require('../');
let SettingsPage = require('../../pages/settings');

let page = new SettingsPage();

class SettingsSteps extends Steps {
	static get page () {
		return page;
	}
}

module.exports = SettingsSteps;
