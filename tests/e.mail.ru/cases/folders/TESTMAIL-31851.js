// https://jira.mail.ru/browse/TESTMAIL-31851?focusedCommentId=3688550

/*
'use strict';

let Folders = require('../../steps/folders');

describe('TESTMAIL-31851', () => {
	before(() => {
		Folders.auth();
	});

	beforeEach(() => {
		Folders.enableCollapseFeature();
	});

	afterEach(() => {
		Folders.resetTimeOffset();
	});

	it('Список писем. Сворачивание папок по времени. ' +
		'Если в подпапку за день хоть раз заходили, то папка не свернется', () => {
		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: '0'
		});

		Folders.open();

		Folders.setTimeOffset((Folders.collapseTimeout / 2) * 60);

		Folders.goToFolder(folderId);

		Folders.setTimeOffset((Folders.collapseTimeout * 60) - (60 * 60));

		Folders.goToFolder('500002');

		Folders.isFolderVisible(folderId);
	});
});
*/
