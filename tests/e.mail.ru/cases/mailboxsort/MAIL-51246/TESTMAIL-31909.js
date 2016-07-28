'use strict';

let all = require('.');

describe('TESTMAIL-31909', () => {
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
		all.CleanerSteps.dragFromInboxToSpam();
		all.finishCleaner();

		all.FoldersSteps.open();
		all.FoldersSteps.isArchiveNotExists();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			all.FoldersSteps.isFolderNotExists(all.foldersStore.ids[name]);
		});
	});
});