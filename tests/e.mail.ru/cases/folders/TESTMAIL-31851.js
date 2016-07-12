'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 20;
const FOLDER_UPDATE_PERIOD = 1;

let Folders = require('../../steps/folders');

describe('TESTMAIL-31851', () => {
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
		'Если в подпапку за день хоть раз заходили, то папка не свернется', () => {
		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: '0'
		});

		let start = new Date();

		Folders.open();

		browser.pause(2000);

		Folders.goToFolder(folderId);

		let offset = Math.floor((new Date() - start) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);

		Folders.goToFolder('500002');

		Folders.isFolderVisible(folderId);
	});
});
