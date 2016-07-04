'use strict';

let Steps = require('../../steps');
let Compose = require('../../steps/compose');
let FiltersSteps = require('../../steps/settings/filters');
let SettingsSteps = require('../../steps/settings');
let CleanerSteps = require('../../steps/layers/cleaner');

describe('TESTMAIL-31905', () => {
	before(() => {
		Steps.auth();
	});

	beforeEach(() => {
		FiltersSteps.open();
		// FiltersSteps.openPage();
	});

	it('should create archive and subfolders', () => {
		FiltersSteps.waitForUtility1();
		FiltersSteps.click1();
		// FiltersSteps
	});
});
