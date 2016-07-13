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

describe('TESTMAIL-31911', () => {
	before(() => {
		login();
		createArchive(foldersStore.ids.root, 'Архив');
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
			FoldersSteps.isFolderInArchive(foldersStore.ids[name]);
		});
	});
});
