'use strict';

let Folders = require('../../../steps/folders');
let foldersStore = require('../../../store/folders');
let accountUtils = require('../../../utils/account');

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10;

let { options = {
	name: 'Список писем. Сворачивание папок по времени. ' +
		'Проверка, что закрытая запароленная папка с подпапками не ' +
		'сворачивается при любом действии в почте, только по истечению суток свернется'
}} = module.parent;

describe(() => {
	before(() => {
		Folders.auth();
		Folders.enableCollapseFeature(FOLDER_COLLAPSE_TIMEOUT, FOLDER_UPDATE_PERIOD, true);
	});

	it(options.name, () => {
		let query = {
			folder_update_period: FOLDER_UPDATE_PERIOD
		};

		let firstFolderId = Folders.createSecretFolder({
			name: 'Тестовая папка',
			parent: foldersStore.ids.root,
			secret: {
				password: accountUtils.generatePassword(10, true)
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
