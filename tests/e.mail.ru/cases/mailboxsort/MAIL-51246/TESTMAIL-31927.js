'use strict';

let all = require('.');

describe('TESTMAIL-31927', () => {
	before(() => {
		all.login();
		all.deleteArchive();
		all.enableCleaner();
	});

	beforeEach(() => {
		all.Steps.refresh();
		all.FiltersSteps.registerCleanerHook();
	});

	it('should create archive and subfolders', () => {
		all.launchCleanerInternally();
		all.finishCleaner();

		all.BalloonsSteps.waitForVisible('balloon-cleaner-archive');
		all.BalloonsSteps.isBalloonVisible('balloon-cleaner-archive');
	});
});