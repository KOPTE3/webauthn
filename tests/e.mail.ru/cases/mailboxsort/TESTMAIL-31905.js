'use strict';

let Steps = require('../../steps');
let FoldersSteps = require('../../steps/folders');
let FiltersSteps = require('../../steps/settings/filters');
let CleanerSteps = require('../../steps/layers/cleaner');

describe('TESTMAIL-31905', () => {
	before(() => {
		// Steps.auth('basic', {
		// 	username: 'avgemr03@mail.ru',
		// 	password: 'TestP4ss'
		// });
		Steps.auth();
	});

	beforeEach(() => {
		// FiltersSteps.open();
		// FiltersSteps.openPage();
	});

	it('should create archive and subfolders', () => {
		FoldersSteps.open();

		try {
			FoldersSteps.isArchiveNotExists();
		} catch (exception) {
			FoldersSteps.deleteArchive();
		}

		FiltersSteps.open();

		FiltersSteps.enableCleaner();
		FiltersSteps.refresh();
		FiltersSteps.registerHook();

		FiltersSteps.waitForCleaner();
		FiltersSteps.launchCleaner();
		CleanerSteps.waitForCleanerMain();

		CleanerSteps.process();
		CleanerSteps.waitForCleanerResult();

		CleanerSteps.finish();

		FoldersSteps.open();

		FoldersSteps.isArchiveExists();
		FoldersSteps.isSocialExistsInArchive();
		FoldersSteps.isPromotionsExistsInArchive();
		FoldersSteps.isNewslettersExistsInArchive();
	});
});
