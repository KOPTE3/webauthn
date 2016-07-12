'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10800;

let Folders = require('../../steps/folders');

let foldersStore = require('../../store/folders');

describe('TESTMAIL-31846', () => {
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
		'Проверка, что если в подпапку не заходили 1 день ' +
		'а в папку заходили, то папка свернется', () => {
		let mainFolderId = Folders.createFolder({
			name: 'Папка',
			parent: foldersStore.ids.root
		});

		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: mainFolderId
		});

		let timer = new Date();

		Folders.open();

		browser.pause(2000);

		Folders.goToFolder(mainFolderId);

		let offset = Math.floor((new Date() - timer) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);

		Folders.goToFolder(foldersStore.ids.sent);

		Folders.isFolderHidden(folderId);
	});
});
