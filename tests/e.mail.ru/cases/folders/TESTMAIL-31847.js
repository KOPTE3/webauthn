'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 20;
const FOLDER_UPDATE_PERIOD = 1;

let Folders = require('../../steps/folders');
let SettingsFolders = require('../../steps/settings/folders');

describe('TESTMAIL-31847', () => {
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
		'Проверка, что если к папке с подпапками через настройки добавили еще одну подпапку, ' +
		'то папка свернется только через 24 часа даже если в нее не заходили до этого', () => {
		let firstFolderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: '0'
		});

		let start = new Date();

		browser.pause(2000);

		SettingsFolders.open();

		let secondFolderId = SettingsFolders.createFolder({
			name: 'Тестовая папка 2',
			parent: '0'
		});

		Folders.open();

		let offset = Math.floor((new Date() - start) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);

		Folders.goToFolder('500000');

		Folders.isFolderVisible(firstFolderId);
		Folders.isFolderVisible(secondFolderId);

		Folders.setTimeOffset(offset, true);

		Folders.goToFolder('500002');

		Folders.isFolderHidden(firstFolderId);
		Folders.isFolderHidden(secondFolderId);
	});
});
