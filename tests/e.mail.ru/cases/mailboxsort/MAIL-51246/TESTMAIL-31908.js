'use strict';

let all = require('.');

let ids;

describe(() => {
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

		['social', 'promotions', 'newsletters'].forEach(name => {
			all.CleanerSteps.selectFolder(all.cleanerStore.categories[name], ids.pop());
		});

		all.finishCleaner();

		all.FoldersSteps.open();
		all.FoldersSteps.isArchiveNotExists();

		['social', 'promotions', 'newsletters'].forEach(name => {
			all.FoldersSteps.isFolderNotExists(all.foldersStore.ids[name]);
		});
	});
});
