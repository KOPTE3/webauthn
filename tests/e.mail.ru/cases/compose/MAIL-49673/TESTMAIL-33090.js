'use strict';

module.options = {
	name: 'Новое написание письма. Имена файлов в теме письма. НЕ AJAX. ' +
	'Проверка темы письма, когда добавили больше 3 файлов ' +
	'(добавляется "и еще Х файл[а][ов]")',
	noajax: true,
	compose2: true
};

require('./TESTMAIL-32936');
