'use strict';

let Folders = require('../../steps/folders');

describe('TESTMAIL-31844', () => {
	before(() => {
		Folders.auth();
	});

	afterEach(() => {
		Folders.resetTimeOffset();
	});

	it('Список писем. Сворачивание папок по времени.' +
		'Проверка, что если в дефолтную папку и ее подпапку,' +
		'не заходили 1 день, то она свернется', () => {
		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: '0'
		});

		Folders.open();
		Folders.setTimeOffset(60 * 60 * 24);
		Folders.goToFolder('500000');
		Folders.isFolderHidden(folderId);
	});
});
