'use strict';

module.options = {
	name: 'Новое написание письма. Имена файлов в теме письма. ' +
	'Проверка, что после удаления файла из письма, из темы удаляется имя файла, ' +
	'когда прикреплено несколько файлов.',
	compose2: true
};

require('./TESTMAIL-32939');
