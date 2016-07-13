'use strict';

let Steps = require('../../steps');
let FoldersSteps = require('../../steps/folders');
let FiltersSteps = require('../../steps/settings/filters');
let CleanerSteps = require('../../steps/layers/cleaner');

let foldersStore = require('../../store/folders');
let cleanerStore = require('../../store/cleaner');

function login() {
	Steps.auth();

	Steps.features([
		'mailboxsort-widget-archive',
		'balloon-cleaner-archive'
	]);

	FoldersSteps.open();
}

function deleteArchive() {
	try {
		FoldersSteps.isArchiveNotExists();
	} catch (exception) {
		FoldersSteps.deleteArchive();

		FoldersSteps.refresh();
		FoldersSteps.isArchiveNotExists();
	}
}

function createArchive(parentId, name) {
	try {
		FoldersSteps.isArchiveIn(parentId);
	} catch (exception) {
		deleteArchive();

		// В данный момент не работает из-за бага https://jira.mail.ru/browse/MAIL-51729
		// FoldersSteps.createArchiveIn(foldersStore.ids.inbox);

		// Поэтому сначала создаем подпапку, потом конвертируем ее в архив
		let id = FoldersSteps.createFolder({
			name: name,
			parent: parentId,
			type: 'user'
		});

		FoldersSteps.convertFolderToArchive(id);

		FoldersSteps.refresh();
		FoldersSteps.isArchiveIn(parentId);
	}
}

function enableCleaner() {
	FiltersSteps.enableCleaner();
}

function openFiltersSettings() {
	FiltersSteps.open();
	FiltersSteps.registerCleanerHook();
}

function launchCleaner() {
	FiltersSteps.waitForCleaner();

	FiltersSteps.launchCleaner();
	CleanerSteps.waitForCleanerMain();
}

function finishCleaner() {
	CleanerSteps.process();
	CleanerSteps.waitForCleanerResult();

	CleanerSteps.finish();
}

module.exports = {
	login,
	deleteArchive,
	createArchive,
	enableCleaner,
	openFiltersSettings,
	launchCleaner,
	finishCleaner
};
