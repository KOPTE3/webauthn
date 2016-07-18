'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 10;
const FOLDER_UPDATE_PERIOD = 10;

let path = require('path');
let Folders = require('../../steps/folders');
let foldersStore = require('../../store/folders');

let {options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, что если находимся сутки в папке, ' +
		'то после обновления страницы папка свернется'
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
		let query = {
			folder_update_period: FOLDER_UPDATE_PERIOD
		};

		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: foldersStore.ids.inbox
		});

		Folders.open(query);
		Folders.isFolderVisible(folderId);
		Folders.pause(FOLDER_COLLAPSE_TIMEOUT * 1000);
		Folders.refresh(query);
		Folders.isFolderHidden(folderId);
	});
});
