'use strict';

module.options = {
	name: 'Новое написание письма. Имена файлов в теме письма. Проверка, ' +
	'что если сами очистили тему, то при добавлении файла, его имя не добавляется в тему письма',
	compose2: true
};

require('./TESTMAIL-32942');
