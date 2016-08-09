'use strict';

module.options = {
	name: 'Ответ на письмо (новое написание). Имена файлов в теме письма. AJAX. ' +
	'Проверка, что при ответе на письмо с пустой темой с НЕ AJAX чтения, ' +
	'когда добавляем файл, тема не меняется.',
	readmsgnoajax: true,
	compose2: true
};

require('./TESTMAIL-32948');
