'use strict';

let FoldersSteps = require('../../steps/folders');
let foldersStore = require('../../store/folders');
let CleanerSteps = require('../../steps/layers/cleaner');
let cleanerStore = require('../../store/cleaner');

let mailboxsort = require('.');

let ids;

describe('TESTMAIL-31919', () => {
	before(() => {
		mailboxsort.login();
		mailboxsort.createArchive(foldersStore.ids.root, 'Архив');
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
		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderNotInArchive(foldersStore.ids[name]);
		});
	});
});
