'use strict';

let FoldersSteps = require('../../steps/folders');
let foldersStore = require('../../store/folders');

let {
	login,
	deleteArchive,
	createArchive,
	enableCleaner,
	openFiltersSettings,
	launchCleaner,
	finishCleaner
} = require('.');

describe('TESTMAIL-31917', () => { // Полный клон TESTMAIL-31915
	before(() => {
		login();
		createArchive(foldersStore.ids.inbox, 'Папка для архива');
		enableCleaner();
	});

	beforeEach(() => {
		openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		launchCleaner();

		finishCleaner();

		FoldersSteps.open();

		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderExists(foldersStore.ids[name]);
			FoldersSteps.isFolderNotInArchive(foldersStore.ids[name]);
		});
	});
});
