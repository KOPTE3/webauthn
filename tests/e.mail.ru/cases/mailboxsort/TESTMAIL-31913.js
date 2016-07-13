'use strict';

let FoldersSteps = require('../../steps/folders');
let foldersStore = require('../../store/folders');

let mailboxsort = require('.');

describe('TESTMAIL-31913', () => { // Полный клон TESTMAIL-31911
	before(() => {
		mailboxsort.login();
		mailboxsort.createArchive(foldersStore.ids.root, 'Папка для архива');
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
			FoldersSteps.isFolderInArchive(foldersStore.ids[name]);
		});
	});
});
