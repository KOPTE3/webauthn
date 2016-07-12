'use strict';

let Steps = require('../../steps');
let FoldersSteps = require('../../steps/folders');
let FiltersSteps = require('../../steps/settings/filters');
let CleanerSteps = require('../../steps/layers/cleaner');

let foldersStore = require('../../store/folders');
let cleanerStore = require('../../store/cleaner');

describe('TESTMAIL-31909', () => {
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
		FiltersSteps.registerCleanerHook();
	});

	it('should create archive and subfolders', () => {
		FiltersSteps.waitForCleaner();

		FiltersSteps.launchCleaner();
		CleanerSteps.waitForCleanerMain();

		['social', 'promotions', 'newsletters'].forEach((name) => {
			CleanerSteps.removeFolder(cleanerStore.categories[name]);
		});

		CleanerSteps.dragFromInboxToSpam();

		CleanerSteps.process();
		CleanerSteps.waitForCleanerResult();

		CleanerSteps.finish();

		FoldersSteps.open();

		FoldersSteps.isArchiveNotExists();

		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderNotExists(foldersStore.ids[name]);
		});
	});
});
