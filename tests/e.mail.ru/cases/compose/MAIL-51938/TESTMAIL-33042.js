'use strict';

module.options = {
	fastAnswer: true,
	tests: [
		{
			testcase: 'TESTMAIL-33042',
			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка отправки и пришедшего письма с html подписью'
		},
		{
			skip: true
		}
	]
};

require('./TESTMAIL-33023-33026');
