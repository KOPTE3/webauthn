'use strict';

module.options = {
	name: 'Список писем. Треды. Сворачивание папок по времени. ' +
		'Проверка, что если в подпапку не заходили 1 день, ' +
		'а в папку заходили, то папка свернется',
	threads: true
};

require('./TESTMAIL-31846');

