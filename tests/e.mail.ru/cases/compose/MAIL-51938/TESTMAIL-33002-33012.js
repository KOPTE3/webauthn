'use strict';

module.options = {
	signatureBeforeText: true,
	signatures: [
		{image: false, isDefault: true},
		{image: false}
	],
	overrideTests: {
		'TESTMAIL-32995': {
			testcase: 'TESTMAIL-33002',
			name: 'Полный ответ на письмо. HTML подпись. AJAX. Проверка смены подписи, ' +
			'когда подпись перед цитируемым текстом (обычный текст) и что она не меняется ' +
			'в цитировании'
		},

		'TESTMAIL-33005': {
			testcase: 'TESTMAIL-33012',
			name: 'Полный ответ на письмо. HTML подпись. НЕ AJAX. Проверка смены подписи, ' +
			'когда подпись перед цитируемым текстом (обычный текст) и что она не меняется ' +
			'в цитировании'
		}
	}
};

require('./TESTMAIL-32988-32995-33005');
