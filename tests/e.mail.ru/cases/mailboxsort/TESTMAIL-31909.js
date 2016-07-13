'use strict';

let FoldersSteps = require('../../steps/folders');
let CleanerSteps = require('../../steps/layers/cleaner');
let foldersStore = require('../../store/folders');
let cleanerStore = require('../../store/cleaner');

let {
	login,
	deleteArchive,
	createArchive,
	enableCleaner,
	openFiltersSettings,
	launchCleaner,
	finishCleaner
} = require('.');

describe('TESTMAIL-31909', () => {
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

		['social', 'promotions', 'newsletters'].forEach((name) => {
			CleanerSteps.removeFolder(cleanerStore.categories[name]);
		});

		CleanerSteps.dragFromInboxToSpam();

		finishCleaner();

		FoldersSteps.open();

		FoldersSteps.isArchiveNotExists();

		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderNotExists(foldersStore.ids[name]);
		});
	});
});
