'use strict';

let all = require('.');

describe('TESTMAIL-31923', () => {
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
		all.CleanerSteps.removeFolder(all.cleanerStore.categories.social);

		all.CleanerSteps.isArchiveLabelVisible();

		[1, 3].forEach((number) => {
			all.CleanerSteps.isArchiveGraphBranchVisible(number);
		});

		[2, 4, 5].forEach((number) => {
			all.CleanerSteps.isArchiveGraphBranchNotVisible(number);
		});
	});
});
