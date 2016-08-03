'use strict';

let all = require('.');

describe(() => {
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

		['social', 'promotions', 'newsletters'].forEach(name => {
			all.CleanerSteps.removeFolder(all.cleanerStore.categories[name]);
			all.CleanerSteps.createFolder();
		});

		all.CleanerSteps.isArchiveLabelVisible();

		[1, 3, 5].forEach(number => {
			all.CleanerSteps.isArchiveGraphBranchVisible(number);
		});

		[2, 4].forEach(number => {
			all.CleanerSteps.isArchiveGraphBranchNotVisible(number);
		});
	});
});
