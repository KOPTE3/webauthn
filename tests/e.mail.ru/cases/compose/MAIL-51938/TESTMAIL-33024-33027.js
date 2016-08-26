'use strict';

module.options = {
	signatureBeforeText: true,
	tests: [
		{
			testcase: 'TESTMAIL-33024',
			name: 'Полный ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка отправки и пришедшего письма с html подписью, ' +
			'когда подпись перед цитируемым текстом'
		},
		{
			testcase: 'TESTMAIL-33027',
			name: 'Полный ответ на письмо. HTML подпись. НЕ AJAX. ' +
			'Проверка отправки и пришедшего письма с html подписью, ' +
			'когда подпись перед цитируемым текстом'
		}
	]
};

require('./TESTMAIL-33023-33026');
