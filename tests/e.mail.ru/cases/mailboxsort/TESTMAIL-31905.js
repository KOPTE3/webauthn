'use strict';

let FoldersSteps = require('../../steps/folders');
let foldersStore = require('../../store/folders');

let mailboxsort = require('.');

describe('TESTMAIL-31905', () => {
	before(() => {
		mailboxsort.login();
		mailboxsort.deleteArchive();
		mailboxsort.enableCleaner();
	});

	beforeEach(() => {
		mailboxsort.openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		mailboxsort.launchCleaner();
		mailboxsort.finishCleaner();

		FoldersSteps.open();
		FoldersSteps.isArchiveExists();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderInArchive(foldersStore.ids[name]);
		});
	});
});
