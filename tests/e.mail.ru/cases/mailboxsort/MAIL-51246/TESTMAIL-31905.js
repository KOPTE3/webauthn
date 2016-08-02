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
		all.finishCleaner();

		all.FoldersSteps.open();
		all.FoldersSteps.isArchiveExists();

		['social', 'promotions', 'newsletters'].forEach(name => {
			all.FoldersSteps.isFolderInArchive(all.foldersStore.ids[name]);
		});
	});
});
