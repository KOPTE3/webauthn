'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10;

let path = require('path');
let Folders = require('../../../steps/folders');
let foldersStore = require('../../../store/folders');
let authStore = require('../../../store/authorization');

let {options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, что закрытая запароленная папка с подпапками не ' +
		'сворачивается при любом действии в почте, только по истечению суток свернется'
}} = module.parent;

let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

describe(name, () => {
	before(() => {
		Folders.auth();
		Folders.enableCollapseFeature(FOLDER_COLLAPSE_TIMEOUT, FOLDER_UPDATE_PERIOD, true);
	});

	it(options.name, () => {
		let query = {
			folder_update_period: FOLDER_UPDATE_PERIOD
		};

		let firstFolderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: foldersStore.ids.root,
			secret: {
				folder_password: '123qweasd',
				user_password: authStore.account.get('password'),
				question: 'кто я?',
				answer: 'никто'
			}
		});

		let secondFolderId = Folders.createFolder({
			name: 'Тестовая папка 2',
			parent: firstFolderId
		});

		Folders.setCollapseFolder(firstFolderId);
		Folders.setCloseFolder(firstFolderId);
		Folders.open(query);
		Folders.isFolderHidden(secondFolderId);
		Folders.expandFolder(firstFolderId);

		let timer = new Date();

		Folders.pause(2000);
		Folders.goToFolder(foldersStore.ids.sent);
		Folders.isFolderVisible(secondFolderId);

		let offset = Math.floor((new Date() - timer) / 1000);

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT - offset);
		Folders.goToFolder(foldersStore.ids.trash);
		Folders.isFolderHidden(secondFolderId);
	});
});
