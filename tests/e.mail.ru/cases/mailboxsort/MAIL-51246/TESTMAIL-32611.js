'use strict';

let all = require('.');

describe('TESTMAIL-32611', () => {
	before(() => {
		all.Steps.features([
			'mailboxsort-allow-parent-edit'
		]);

		all.login();
		all.createArchive(all.foldersStore.ids.root, 'Архив');
	});

	it('should create archive and subfolders', () => {
		all.moveArchive(all.foldersStore.ids.inbox);
		all.FoldersSteps.isArchiveIn(all.foldersStore.ids.inbox);

		all.Steps.refresh();

		all.moveArchive(all.foldersStore.ids.root);
		all.FoldersSteps.isArchiveIn(all.foldersStore.ids.root);
	});
});
