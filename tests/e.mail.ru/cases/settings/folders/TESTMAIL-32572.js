'use strict';

let Folders = require('../../../steps/folders');
let FoldersSettings = require('../../../steps/settings/folders');
let foldersStore = require('../../../store/folders');

describe('TESTMAIL-32572. Папки. Проверить редактирование ' +
	'запароленной папки из настроек папок.', () => {
	before(() => {
		Folders.auth();
	});

	it('Снятие запароленности', () => {
		let parent = foldersStore.ids.inbox;
		let name = 'Запароленная папка';
		let password = 'очень сложный пароль';

		let folderId = Folders.createSecretFolder({
			name,
			parent,
			secret: {
				password
			}
		});

		Folders.openSecretFolder(folderId, password);
		FoldersSettings.open();

		FoldersSettings.openEditLayer(folderId);
		FoldersSettings.fillEditLayer({ secret: false });
		FoldersSettings.fillEditLayer({ userPassword: true });
		FoldersSettings.submitEditLayer();

		FoldersSettings.waitForNotify('ok', 'Изменения сохранены');
		FoldersSettings.checkFolderIcon(folderId, 'user');
	});
});
