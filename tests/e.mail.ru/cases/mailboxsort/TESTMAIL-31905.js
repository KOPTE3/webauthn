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

describe('TESTMAIL-31905', () => {
	before(() => {
		login();
		deleteArchive();
		enableCleaner();
	});

	beforeEach(() => {
		openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		launchCleaner();

		finishCleaner();

		FoldersSteps.open();

		FoldersSteps.isArchiveExists();

		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderInArchive(foldersStore.ids[name]);
		});
	});
});
