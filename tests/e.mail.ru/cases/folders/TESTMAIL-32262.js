'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10;

let path = require('path');
let Folders = require('../../steps/folders');
let SettingsFolders = require('../../steps/settings/folders');
let foldersStore = require('../../store/folders');

let {options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, что если подпапку редактировали, то папка свернется только через 24 ' +
		'часа даже если в папку и подпапку не заходили до этого'
}} = module.parent;

let name = path.basename(module.parent.options ? module.parent.filename : module.filename, '.js');

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

		let timer = new Date();

		Folders.pause(FOLDER_UPDATE_PERIOD * 1000);

		SettingsFolders.open(query);
		SettingsFolders.editFolder({
			id: folderId,
			name: 'Тестовая папка 2'
		});

		Folders.open(query);
		Folders.isFolderVisible(folderId);

		let offset = Math.floor((new Date() - timer) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);
		Folders.goToFolder(foldersStore.ids.sent);
		Folders.isFolderVisible(folderId);
		Folders.setTimeOffset(offset, true);
		Folders.goToFolder(foldersStore.ids.trash);
		Folders.isFolderHidden(folderId);
	});
});
