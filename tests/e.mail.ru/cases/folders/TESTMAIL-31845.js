'use strict';

let Folders = require('../../steps/folders');

describe('TESTMAIL-31845', () => {
	before(() => {
		Folders.auth();
	});

	afterEach(() => {
		Folders.resetTimeOffset();
	});

	it('Список писем. Сворачивание папок по времени.' +
		'Проверка, что если в пользовательскую папку и ее подпапку,' +
		'не заходили 1 день, то она свернется', () => {
		let mainFolderId = Folders.createFolder({
			name: 'Папка',
			parent: '-1'
		});

		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: mainFolderId
		});

		Folders.open();

		Folders.setTimeOffset(60 * 60 * 24);

		Folders.goToFolder('500000');
		Folders.isFolderHidden(folderId);
	});
});

