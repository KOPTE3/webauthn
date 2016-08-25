'use strict';

module.options = {
	signatureBeforeText: false,

	signatures: [
		{image: true, isDefault: true},
		{image: true}
	],

	overrideTests: {
		'TESTMAIL-33029': {
			testcase: 'TESTMAIL-33031',
			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка смены подписи ' +
			'(две подписи, две отредактированы через панель редактирования с картинкой) ' +
			'и что она не меняется в цитировании'
		}
	}
};

require('./TESTMAIL-33029');
