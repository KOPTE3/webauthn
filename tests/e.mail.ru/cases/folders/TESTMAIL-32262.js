'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 20;
const FOLDER_UPDATE_PERIOD = 1;

let Folders = require('../../steps/folders');
let SettingsFolders = require('../../steps/settings/folders');

describe('TESTMAIL-32262', () => {
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
		'Проверка, что если подпапку редактировали, то папка свернется только через 24 ' +
		'часа даже если в папку и подпапку не заходили до этого', () => {
		let firstFolderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: '0'
		});

		let start = new Date();

		browser.pause(2000);

		SettingsFolders.open();

		SettingsFolders.editFolder({
			id: firstFolderId,
			name: 'Тестовая папка 2'
		});

		Folders.open();

		let offset = Math.floor((new Date() - start) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);

		Folders.goToFolder('500000');

		Folders.isFolderVisible(firstFolderId);

		Folders.setTimeOffset(offset, true);

		Folders.goToFolder('500002');

		Folders.isFolderHidden(firstFolderId);
	});
});
