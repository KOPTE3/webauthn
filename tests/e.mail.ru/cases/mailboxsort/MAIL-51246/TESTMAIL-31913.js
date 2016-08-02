'use strict';

let all = require('.');

// Полный клон TESTMAIL-31911
describe(() => {
	before(() => {
		all.login();
		all.createArchive(all.foldersStore.ids.root, 'Папка для архива');
		all.enableCleaner();
	});

	beforeEach(() => {
		all.openFiltersSettings();
	});

	it('should create archive and subfolders', () => {
		all.launchCleaner();
		all.finishCleaner();

		all.FoldersSteps.open();

		['social', 'promotions', 'newsletters'].forEach(name => {
			all.FoldersSteps.isFolderExists(all.foldersStore.ids[name]);
			all.FoldersSteps.isFolderInArchive(all.foldersStore.ids[name]);
		});
	});
});
