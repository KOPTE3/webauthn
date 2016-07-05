'use strict';

let Steps = require('../../steps');
let FiltersSteps = require('../../steps/settings/filters');
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
		FiltersSteps.enableCleaner();
		FiltersSteps.refresh();
		FiltersSteps.registerHook();
		FiltersSteps.waitForCleaner();
		FiltersSteps.launchCleaner();
		CleanerSteps.waitForCleaner();
		// FiltersSteps
	});
});
