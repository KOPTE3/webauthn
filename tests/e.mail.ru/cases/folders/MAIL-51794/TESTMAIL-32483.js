'use strict';

let Folders = require('../../../steps/folders');
let foldersStore = require('../../../store/folders');

const FOLDER_COLLAPSE_TIMEOUT = 10;
const FOLDER_UPDATE_PERIOD = 10;

let { options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, что если находимся сутки в подпапке, ' +
		'то после обновления страницы подпапка видна'
}} = module.parent;

describe(() => {
	before(() => {
		Folders.auth();
		Folders.enableCollapseFeature(FOLDER_COLLAPSE_TIMEOUT, FOLDER_UPDATE_PERIOD, true);

		if (options.threads) {
			Folders.enableThreads();
		}
	});

	it(options.name, () => {
		let query = {
			folder_update_period: FOLDER_UPDATE_PERIOD
		};

		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: foldersStore.ids.inbox
		});

		Folders.open(query);
		Folders.isFolderVisible(folderId);
		Folders.goToFolder(folderId);
		Folders.pause(FOLDER_COLLAPSE_TIMEOUT * 1000);
		Folders.refresh(query);
		Folders.isFolderVisible(folderId);
	});
});
