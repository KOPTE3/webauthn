'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10800;

let Folders = require('../../steps/folders');

describe('TESTMAIL-31845', () => {
	before(() => {
		Folders.auth();
	});

	beforeEach(() => {
		Folders.enableCollapseFeature(FOLDER_COLLAPSE_TIMEOUT,
			FOLDER_UPDATE_PERIOD, true);
		Folders.enableThreads();
	});

	afterEach(() => {
		Folders.resetTimeOffset();
	});

	it('Список писем. Сворачивание папок по времени. ' +
		'Проверка, что если в пользовательскую папку и ее подпапку, ' +
		'не заходили 1 день, то она свернется', () => {
		let mainFolderId = Folders.createFolder({
			name: 'Папка',
			parent: '-1'
		});

		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: mainFolderId
		});

		Folders.expandFolder(mainFolderId);

		Folders.open();

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT);

		Folders.goToFolder('500000');

		Folders.isFolderHidden(folderId);
	});
});

