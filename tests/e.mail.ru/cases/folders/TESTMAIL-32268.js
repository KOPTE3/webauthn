'use strict';

module.options = {
	name: 'Список писем. Треды. Сворачивание папок по времени. ' +
		'Проверка, что если к папке с подпапками через настройки добавили еще одну подпапку, ' +
		'то папка свернется только через 24 часа даже если в нее не заходили до этого',
	threads: true
};

require('./TESTMAIL-31847');

