'use strict';

let all = require('.');

let ids;

describe('TESTMAIL-31919', () => {
	before(() => {
		all.login();
		all.createArchive(all.foldersStore.ids.root, 'Архив');
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
		all.finishCleaner();

		all.FoldersSteps.open();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			all.FoldersSteps.isFolderNotInArchive(all.foldersStore.ids[name]);
		});
	});
});
