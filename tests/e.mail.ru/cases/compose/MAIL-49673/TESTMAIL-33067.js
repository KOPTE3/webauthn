'use strict';

module.options = {
	name: 'Ответ на письмо. Имена файлов в теме письма. НЕ AJAX. ' +
	'Проверка, что при ответе на письмо с пустой темой с НЕ AJAX ' +
	'чтения, когда добавляем файл, тема не меняется.',
	readmsgnoajax: true,
	noajax: true
};

require('./TESTMAIL-32948');
