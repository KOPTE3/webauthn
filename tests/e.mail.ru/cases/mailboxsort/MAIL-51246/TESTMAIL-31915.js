'use strict';

let all = require('.');

describe('TESTMAIL-31915', () => {
	before(() => {
		all.login();
		all.createArchive(all.foldersStore.ids.inbox, 'Архив');
		all.enableCleaner();
	});

	beforeEach(() => {
		all.openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		all.launchCleaner();
		all.finishCleaner();

		all.FoldersSteps.open();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			all.FoldersSteps.isFolderExists(all.foldersStore.ids[name]);
			all.FoldersSteps.isFolderNotInArchive(all.foldersStore.ids[name]);
		});
	});
});
