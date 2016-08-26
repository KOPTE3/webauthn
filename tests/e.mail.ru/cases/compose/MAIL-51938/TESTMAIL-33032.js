'use strict';

module.options = {
	signatureBeforeText: false,

	signatures: [
		{image: false, isDefault: true},
		{image: false}
	],

	overrideTests: {
		'TESTMAIL-33029': {
			testcase: 'TESTMAIL-33032',
			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка смены подписи ' +
			'(две подписи, обычный текст) ' +
			'и что она не меняется в цитировании'
		}
	}
};

require('./TESTMAIL-33029');
