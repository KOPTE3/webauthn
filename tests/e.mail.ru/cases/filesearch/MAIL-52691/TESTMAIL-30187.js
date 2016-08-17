'use strict';

let FileSearchFiles = require('../../../steps/filesearch/files');
let FileSearchContextMenu = require('../../../steps/filesearch/contextmenu');

let fileSearchFiles = new FileSearchFiles();
let fileSearchContextMenu = new FileSearchContextMenu();

module.options = {
	desc: `Filesearch. Вид таблица. Проверить попап потенциально опасных файлов.
	 Проверить скачивание аттача из попапа через тулбар.`,
	type: 'list',
	action: () => {
		fileSearchFiles.openContextMenu();
		fileSearchContextMenu.download();
	}
};

require('./TESTMAIL-30174');
