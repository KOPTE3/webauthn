'use strict';

module.options = {
	signatureBeforeText: true,

	signatures: [
		{image: false, isDefault: true},
		{image: false}
	],

	overrideTests: {
		'TESTMAIL-33029': {
			testcase: 'TESTMAIL-33036',
			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка смены подписи, когда подпись перед цитируемым текстом ' +
			'(две подписи, обычный текст) ' +
			'и что она не меняется в цитировании',
		}
	}
};

require('./TESTMAIL-33029');
