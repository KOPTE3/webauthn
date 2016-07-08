'use strict';

let Steps = require('../../steps');
let FoldersSteps = require('../../steps/folders');
let FiltersSteps = require('../../steps/settings/filters');
let CleanerSteps = require('../../steps/layers/cleaner');

describe('TESTMAIL-31915', () => {
	before(() => {
		Steps.auth();

		Steps.features([
			'mailboxsort-widget-archive',
			'balloon-cleaner-archive'
		]);

		FoldersSteps.open();

		try {
			FoldersSteps.isArchiveIn('0');
		} catch (exception) {
			try {
				FoldersSteps.isArchiveNotExists();
			} catch (exception) {
				FoldersSteps.deleteArchive();

				FoldersSteps.refresh();
				FoldersSteps.isArchiveNotExists();
			}

			// В данный момент не работает из-за бага https://jira.mail.ru/browse/MAIL-51729
			// FoldersSteps.createArchiveIn('0');

			// Поэтому сначала создаем подпапку, потом конвертируем ее в архив
			let id = FoldersSteps.createFolder({
				name: 'Архив',
				parent: '0',
				type: 'user'
			});

			FoldersSteps.convertFolderToArchive(id);

			FoldersSteps.refresh();
			FoldersSteps.isArchiveIn('0');
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

		FoldersSteps.isFolderExists('500011'); // social
		FoldersSteps.isFolderNotInArchive('500011');
		FoldersSteps.isFolderExists('500012'); // promotions
		FoldersSteps.isFolderNotInArchive('500012');
		FoldersSteps.isFolderExists('500013'); // newsletters
		FoldersSteps.isFolderNotInArchive('500013');
	});
});
