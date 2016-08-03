'use strict';

let all = require('.');

describe(() => {
	before(() => {
		all.Steps.features([
			'mailboxsort-allow-parent-edit'
		]);

		all.login();
		all.createArchive(all.foldersStore.ids.root, 'Архив');
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
			all.FoldersSteps.isFolderInArchive(all.foldersStore.ids[name]);

			all.moveFolder(all.foldersStore.ids[name], all.foldersStore.ids.root);

			all.FoldersSteps.isFolderIn(all.foldersStore.ids[name],
				all.foldersStore.ids.root);
		});
	});
});
