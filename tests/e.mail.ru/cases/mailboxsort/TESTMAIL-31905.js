'use strict';

let Steps = require('../../steps');
let FoldersSteps = require('../../steps/folders');
let FiltersSteps = require('../../steps/settings/filters');
let CleanerSteps = require('../../steps/layers/cleaner');

describe('TESTMAIL-31905', () => {
	before(() => {
		Steps.auth();

		Steps.features([
			'mailboxsort-widget-archive',
			'balloon-cleaner-archive'
		]);

		FoldersSteps.open();

		try {
			FoldersSteps.isArchiveNotExists();
		} catch (exception) {
			FoldersSteps.deleteArchive();

			FoldersSteps.refresh();
			FoldersSteps.isArchiveNotExists();
		}

		FiltersSteps.enableCleaner();
	});

	beforeEach(() => {
		FiltersSteps.open();
		FiltersSteps.registerHook();
	});

	it('should create archive and subfolders', () => {
		FiltersSteps.waitForCleaner();

		FiltersSteps.launchCleaner();
		CleanerSteps.waitForCleanerMain();

		CleanerSteps.process();
		CleanerSteps.waitForCleanerResult();

		CleanerSteps.finish();

		FoldersSteps.open();

		FoldersSteps.isArchiveExists();
		FoldersSteps.isFolderInArchive('500011'); // social
		FoldersSteps.isFolderInArchive('500011'); // promotions
		FoldersSteps.isFolderInArchive('500011'); // newsletters
	});
});
