'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10800;

let path = require('path');
let Folders = require('../../steps/folders');
let foldersStore = require('../../store/folders');

let {options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, что если в дефолтную папку и ее подпапку, ' +
		'не заходили 1 день, то она свернется'
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

		Folders.open(query);
		Folders.isFolderVisible(folderId);
		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT);
		Folders.goToFolder(foldersStore.ids.sent);
		Folders.isFolderHidden(folderId);
	});
});
