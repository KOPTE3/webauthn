'use strict';

let FileSearchFiles = require('../../../steps/filesearch/files');
let FileSearchToolbar = require('../../../steps/filesearch/toolbar');

let fileSearchFiles = new FileSearchFiles();
let fileSearchToolbar = new FileSearchToolbar();

module.options = {
	desc: `Filesearch. Вид таблица. Проверить попап потенциально опасных файлов.
	 Проверить скачивание аттача из попапа через тулбар.`,
	type: 'thumbs',
	action: () => {
		fileSearchFiles.selectFile();
		fileSearchToolbar.download();
	}
};

require('./TESTMAIL-30174');
