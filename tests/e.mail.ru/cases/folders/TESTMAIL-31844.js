'use strict';

const FOLDER_COLLAPSE_TIMEOUT = 86400;
const FOLDER_UPDATE_PERIOD = 10800;

let Folders = require('../../steps/folders');

describe('TESTMAIL-31844', () => {
	before(() => {
		Folders.auth();
	});

	beforeEach(() => {
		Folders.enableCollapseFeature(FOLDER_COLLAPSE_TIMEOUT,
			FOLDER_UPDATE_PERIOD, true);
		Folders.enableThreads();
	});

	afterEach(() => {
		Folders.resetTimeOffset();
	});

	it('Список писем. Сворачивание папок по времени. ' +
		'Проверка, что если в дефолтную папку и ее подпапку, ' +
		'не заходили 1 день, то она свернется', () => {
		let folderId = Folders.createFolder({
			name: 'Тестовая папка',
			parent: '0'
		});

		Folders.expandFolder('0');

		Folders.open();

		Folders.setTimeOffset(FOLDER_COLLAPSE_TIMEOUT);

		Folders.goToFolder('500000');

		Folders.isFolderHidden(folderId);
	});
});
