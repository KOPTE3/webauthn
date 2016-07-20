'use strict';

let all = require('.');

let ids;

describe('TESTMAIL-31925', () => {
	before(() => {
		all.login();
		all.deleteArchive();
		ids = all.createUserFolders().map(result => result.id);
		all.enableCleaner();
	});

	beforeEach(() => {
		all.openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		all.launchCleaner();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			all.CleanerSteps.selectFolder(all.cleanerStore.categories[name], ids.pop());
		});

		all.CleanerSteps.isArchiveLabelNotVisible();

		[1, 2, 3, 4, 5].forEach((number) => {
			all.CleanerSteps.isArchiveGraphBranchNotVisible(number);
		});
	});
});
