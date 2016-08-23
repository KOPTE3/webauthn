'use strict';

module.options = {
	signatureBeforeText: true,

	signatures: [
		{image: true, isDefault: true},
		{image: true}
	],

	overrideTests: {
		'TESTMAIL-33029': {
			testcase: 'TESTMAIL-33035',
			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка смены подписи, когда подпись перед цитируемым текстом ' +
			'(две подписи, две отредактированы через панель редактирования с картинкой) ' +
			'и что она не меняется в цитировании',
		}
	}
};

require('./TESTMAIL-33029');
