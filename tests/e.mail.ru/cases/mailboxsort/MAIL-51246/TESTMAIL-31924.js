'use strict';

let all = require('.');

describe('TESTMAIL-31924', () => {
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
		['social', 'promotions', 'newsletters'].forEach((name) => {
			all.CleanerSteps.removeFolder(all.cleanerStore.categories[name]);
		});

		all.CleanerSteps.isArchiveLabelNotVisible();

		[1, 2, 3, 4, 5].forEach((number) => {
			all.CleanerSteps.isArchiveGraphBranchNotVisible(number);
		});
	});
});
