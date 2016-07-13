'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 20;
const FOLDER_UPDATE_PERIOD = 1;

let Folders = require('../../steps/folders');
let SettingsFolders = require('../../steps/settings/folders');

let foldersStore = require('../../store/folders');

describe('TESTMAIL-32263', () => {
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
		'Проверка, что если в папку с подпапками не заходили день ' +
		'и удалили одну из подпапок, то папка свернется', () => {
		let [firstFolderId, secondFolderId] = Folders.createFolders([{
			name: 'Тестовая папка',
			parent: foldersStore.ids.inbox
		}, {
			name: 'Тестовая папка 2',
			parent: foldersStore.ids.inbox
		}]);

		let timer = new Date();

		browser.pause(2000);

		SettingsFolders.open();

		SettingsFolders.removeFolder(secondFolderId);

		Folders.open();

		Folders.isFolderVisible(firstFolderId);

		let offset = Math.floor((new Date() - timer) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);

		Folders.goToFolder(foldersStore.ids.sent);

		Folders.isFolderHidden(firstFolderId);
	});
});
