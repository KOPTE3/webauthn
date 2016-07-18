'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10;

let path = require('path');
let Folders = require('../../steps/folders');
let foldersStore = require('../../store/folders');

let {options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, что если у папки несколько подпапок, ' +
		'и в одну из них раз в день заходят, то папка не свернется'
}} = module.parent;

let name = path.basename(module.parent ? module.parent.filename : module.filename, '.js');

describe(name, () => {
	before(() => {
		Folders.auth();
		Folders.enableCollapseFeature(FOLDER_COLLAPSE_TIMEOUT, FOLDER_UPDATE_PERIOD, true);

		if (options.threads) {
			Folders.enableThreads();
		}
	});

	it(options.name, () => {
		let [firstFolderId] = Folders.createFolders([{
			name: 'Тестовая папка',
			parent: foldersStore.ids.inbox
		}, {
			name: 'Тестовая папка 2',
			parent: foldersStore.ids.inbox
		}]);

		let timer = new Date();

		Folders.open();
		Folders.isFolderVisible(firstFolderId);
		Folders.pause(2000);
		Folders.goToFolder(firstFolderId);

		let offset = Math.floor((new Date() - timer) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);
		Folders.goToFolder(foldersStore.ids.sent);
		Folders.isFolderVisible(firstFolderId);
	});
});
