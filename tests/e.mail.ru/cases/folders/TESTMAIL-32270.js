'use strict';

module.options = {
	name: 'Список писем. Треды. Сворачивание папок по времени. ' +
		'Проверка, что если подпапку редактировали, то папка свернется только через 24 ' +
		'часа даже если в папку и подпапку не заходили до этого',
	threads: true
};

require('./TESTMAIL-32262');
