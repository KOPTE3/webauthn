'use strict';

let FoldersSteps = require('../../steps/folders');
let foldersStore = require('../../store/folders');
let CleanerSteps = require('../../steps/layers/cleaner');
let cleanerStore = require('../../store/cleaner');

let mailboxsort = require('.');

let ids;

describe('TESTMAIL-31908', () => {
	before(() => {
		mailboxsort.login();
		mailboxsort.deleteArchive();
		ids = mailboxsort.createUserFolders().map(result => result.id);
		mailboxsort.enableCleaner();
	});

	beforeEach(() => {
		mailboxsort.openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		mailboxsort.launchCleaner();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			CleanerSteps.selectFolder(cleanerStore.categories[name], ids.pop());
		});
		mailboxsort.finishCleaner();

		FoldersSteps.open();
		FoldersSteps.isArchiveNotExists();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderNotExists(foldersStore.ids[name]);
		});
	});
});
