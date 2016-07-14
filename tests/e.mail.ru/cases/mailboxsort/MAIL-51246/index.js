'use strict';

let Steps = require('../../../steps');
let FoldersSteps = require('../../../steps/folders');
let FiltersSteps = require('../../../steps/settings/filters');
let CleanerSteps = require('../../../steps/layers/cleaner');
let BalloonsSteps = require('../../../steps/balloons');

let foldersStore = require('../../../store/folders');
let cleanerStore = require('../../../store/cleaner');

let login = function () {
	Steps.auth();

	Steps.features([
		'mailboxsort-widget-archive',
		'balloon-cleaner-archive'
	]);

	FoldersSteps.open();
};

let deleteArchive = function () {
	try {
		FoldersSteps.isArchiveNotExists();
	} catch (exception) {
		FoldersSteps.deleteArchive();

		FoldersSteps.refresh();
		FoldersSteps.isArchiveNotExists();
	}
};

let createArchive = function (parentId, name) {
	try {
		FoldersSteps.isArchiveIn(parentId);
	} catch (exception) {
		deleteArchive();

		// В данный момент не работает из-за бага https://jira.mail.ru/browse/MAIL-51729
		// FoldersSteps.createArchiveIn(foldersStore.ids.inbox);

		// Поэтому сначала создаем подпапку, потом конвертируем ее в архив
		let id = FoldersSteps.createFolder({
			name,
			parent: parentId,
			type: 'user'
		});

		FoldersSteps.convertFolderToArchive(id);

		FoldersSteps.refresh();
		FoldersSteps.isArchiveIn(parentId);
	}
};

let createUserFolders = function () {
	return ['Папка_1', 'Папка_2', 'Папка_3'].map(function (name) {
		return {
			name,
			id: FoldersSteps.createFolder({
				name,
				parent: foldersStore.ids.root,
				type: 'user'
			})
		};
	});
};

let enableCleaner = function () {
	FiltersSteps.enableCleaner();
};

let openFiltersSettings = function () {
	FiltersSteps.open();
	FiltersSteps.registerCleanerHook();
};

let launchCleaner = function () {
	FiltersSteps.waitForCleaner();

	FiltersSteps.launchCleaner();
	CleanerSteps.waitForCleanerMain();
};

let finishCleaner = function () {
	CleanerSteps.process();
	CleanerSteps.waitForCleanerResult();

	CleanerSteps.finish();
};

module.exports = {
	Steps,
	FoldersSteps,
	FiltersSteps,
	CleanerSteps,
	BalloonsSteps,

	foldersStore,
	cleanerStore,

	login,
	deleteArchive,
	createArchive,
	createUserFolders,
	enableCleaner,
	openFiltersSettings,
	launchCleaner,
	finishCleaner
};
