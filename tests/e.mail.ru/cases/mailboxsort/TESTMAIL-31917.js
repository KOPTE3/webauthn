'use strict';

let FoldersSteps = require('../../steps/folders');
let foldersStore = require('../../store/folders');

let mailboxsort = require('.');

describe('TESTMAIL-31917', () => { // Полный клон TESTMAIL-31915
	before(() => {
		mailboxsort.login();
		mailboxsort.createArchive(foldersStore.ids.inbox, 'Папка для архива');
		mailboxsort.enableCleaner();
	});

	beforeEach(() => {
		mailboxsort.openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		mailboxsort.launchCleaner();
		mailboxsort.finishCleaner();

		FoldersSteps.open();
		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderExists(foldersStore.ids[name]);
			FoldersSteps.isFolderNotInArchive(foldersStore.ids[name]);
		});
	});
});
