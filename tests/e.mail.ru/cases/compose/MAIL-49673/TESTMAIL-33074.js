'use strict';

module.options = {
	name: 'Написание письма. Имена файлов в теме письма. НЕ AJAX. Проверка подставления ' +
	'имени файла в тему (латиница, кириллица, спецсимволы, длинное/короткое имя), ' +
	'когда файл прикреплен с компьютера.',
	noajax: true,
	compose2: true
};

require('./TESTMAIL-32932');
