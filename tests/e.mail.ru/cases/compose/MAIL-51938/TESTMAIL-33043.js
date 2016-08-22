'use strict';

module.options = {
	signatureBeforeText: true,
	fastAnswer: true,
	tests: [
		{
			testcase: 'TESTMAIL-33043',
			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка отправки и пришедшего письма с html подписью, ' +
			'когда подпись перед цитируемым текстом'
		},
		{
			skip: true
		}
	]
};

require('./TESTMAIL-33023-33026');
