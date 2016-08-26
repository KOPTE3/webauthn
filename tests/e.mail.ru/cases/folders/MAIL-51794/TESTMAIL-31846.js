'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10800;

let Folders = require('../../../steps/folders');
let foldersStore = require('../../../store/folders');

let { options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, что если в подпапку не заходили 1 день, ' +
		'а в папку заходили, то папка свернется'
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

		let mainFolderId = Folders.createFolder({
			name: 'Папка',
			parent: foldersStore.ids.root
		});

		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: mainFolderId
		});

		let timer = new Date();

		Folders.open(query);
		Folders.isFolderVisible(folderId);
		Folders.pause(2000);
		Folders.goToFolder(mainFolderId);

		let offset = Math.floor((new Date() - timer) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);
		Folders.goToFolder(foldersStore.ids.sent);
		Folders.isFolderHidden(folderId);
	});
});
