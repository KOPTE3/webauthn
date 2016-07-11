'use strict';

let Folders = require('../../steps/folders');
let SettingsFolders = require('../../steps/settings/folders');

describe('TESTMAIL-31847', () => {
	before(() => {
		Folders.auth();
	});

	afterEach(() => {
		Folders.resetTimeOffset();
	});

	it('Список писем. Сворачивание папок по времени.' +
		'Проверка, что если в дефолтную папку и ее подпапку,' +
		'не заходили 1 день, то она свернется', () => {
		let firstFolderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: '0'
		});

		SettingsFolders.open();

		let secondFolderId = SettingsFolders.createFolder({
			name: 'Тестовая папка 2',
			parent: '0'
		});

		Folders.open();
		Folders.setTimeOffset(60 * 60 * 24);
		Folders.goToFolder('500000');
		Folders.isFolderHidden(firstFolderId);
		Folders.isFolderHidden(secondFolderId);
	});
});
