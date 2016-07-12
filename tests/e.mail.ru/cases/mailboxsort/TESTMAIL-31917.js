'use strict';

let Steps = require('../../steps');
let FoldersSteps = require('../../steps/folders');
let FiltersSteps = require('../../steps/settings/filters');
let CleanerSteps = require('../../steps/layers/cleaner');

let foldersStore = require('../../store/folders');

describe('TESTMAIL-31917', () => { // Полный клон TESTMAIL-31915
	before(() => {
		Steps.auth();

		Steps.features([
			'mailboxsort-widget-archive',
			'balloon-cleaner-archive'
		]);

		FoldersSteps.open();

		try {
			FoldersSteps.isArchiveIn(foldersStore.ids.inbox);
		} catch (exception) {
			try {
				FoldersSteps.isArchiveNotExists();
			} catch (exception) {
				FoldersSteps.deleteArchive();

				FoldersSteps.refresh();
				FoldersSteps.isArchiveNotExists();
			}

			// В данный момент не работает из-за бага https://jira.mail.ru/browse/MAIL-51729
			// FoldersSteps.createArchiveIn(foldersStore.ids.inbox);

			// Поэтому сначала создаем подпапку, потом конвертируем ее в архив
			let id = FoldersSteps.createFolder({
				name: 'Папка для архива',
				parent: foldersStore.ids.inbox,
				type: 'user'
			});

			FoldersSteps.convertFolderToArchive(id);

			FoldersSteps.refresh();
			FoldersSteps.isArchiveIn(foldersStore.ids.inbox);
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

		CleanerSteps.process();
		CleanerSteps.waitForCleanerResult();

		CleanerSteps.finish();

		FoldersSteps.open();

		['social', 'promotions', 'newsletters'].forEach((name) => {
			FoldersSteps.isFolderExists(foldersStore.ids[name]);
			FoldersSteps.isFolderNotInArchive(foldersStore.ids[name]);
		});
	});
});
