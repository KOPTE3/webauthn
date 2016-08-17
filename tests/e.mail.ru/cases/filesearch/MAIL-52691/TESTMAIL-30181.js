'use strict';

let FileSearchFiles = require('../../../steps/filesearch/files');
let fileSearchFiles = new FileSearchFiles();

module.options = {
	desc: `Filesearch. Вид таблица. Проверить попап потенциально опасных файлов.
	 Проверить скачивание аттача из попапа по клику на аттаче`,
	type: 'thumbs',
	action: () => {
		fileSearchFiles.clickDonwloadLink();
	}
};

require('./TESTMAIL-30174');
