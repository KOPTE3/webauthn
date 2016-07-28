'use strict';

let all = require('.');

describe('TESTMAIL-31928', () => {
	before(() => {
		all.login();
		all.deleteArchive();
		all.enableCleaner();
	});

	beforeEach(() => {
		all.openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		all.launchCleaner();
		all.finishCleaner();

		all.FoldersSteps.open();
		all.BalloonsSteps.isBalloonVisible('balloon-cleaner-archive');
	});
});