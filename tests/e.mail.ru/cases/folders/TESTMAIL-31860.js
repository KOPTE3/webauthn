'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10;

let path = require('path');
let Folders = require('../../steps/folders');
let foldersStore = require('../../store/folders');

let {options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, если пользователь сам развернул папку, ' +
		'то через день папки свернуться'
}} = module.parent;

let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

describe(name, () => {
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

		Folders.setCollapseFolder(foldersStore.ids.inbox);
		Folders.open(query);
		Folders.isFolderHidden(folderId);
		Folders.expandFolder(foldersStore.ids.inbox);

		let timer = new Date();

		Folders.pause(2000);
		Folders.goToFolder(foldersStore.ids.sent);
		Folders.isFolderVisible(folderId);

		let offset = Math.floor((new Date() - timer) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);
		Folders.goToFolder(foldersStore.ids.trash);
		Folders.isFolderHidden(folderId);
	});
});
