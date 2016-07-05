'use strict';

let Folders = require('../../steps/folders');
let actions = require('../../utils/actions');
let date = require('../../utils/date');

describe('TESTMAIL-31845', () => {
	before(() => {
		Folders.auth();
	});

	afterEach(() => {
		date.resetTimeOffset();
	});

	it('Список писем. Сворачивание папок по времени.' +
		'Проверка, что если в пользовательскую папку и ее подпапку,' +
		'не заходили 1 день, то она свернется', () => {
		Folders.open();

		let [mainFolderId] = actions.createFolders([{
			name: 'Папка',
			parent: '-1'
		}]).value;

		let [folderId] = actions.createFolders([{
			name: 'Тестовая папка',
			parent: mainFolderId
		}]).value;

		Folders.open();

		date.setTimeOffset(60 * 60 * 24);

		Folders.goToFolder('500000');
		Folders.isFolderHidden(folderId);
	});
});

