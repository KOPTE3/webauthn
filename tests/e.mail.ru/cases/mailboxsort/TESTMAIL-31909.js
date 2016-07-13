'use strict';

let FoldersSteps = require('../../steps/folders');
let foldersStore = require('../../store/folders');
let CleanerSteps = require('../../steps/layers/cleaner');
let cleanerStore = require('../../store/cleaner');

let mailboxsort = require('.');

describe('TESTMAIL-31909', () => {
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
		['social', 'promotions', 'newsletters'].forEach((name) => {
			CleanerSteps.removeFolder(cleanerStore.categories[name]);
		});
		CleanerSteps.dragFromInboxToSpam();
		mailboxsort.finishCleaner();

		FoldersSteps.open();
		FoldersSteps.isArchiveNotExists();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderNotExists(foldersStore.ids[name]);
		});
	});
});
