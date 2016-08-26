'use strict';

module.options = {
	signatureBeforeText: false,

	signatures: [
		{image: true},
		{image: false, isDefault: true}
	],

	overrideTests: {
		'TESTMAIL-33029': {
			testcase: 'TESTMAIL-33030',
			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка смены подписи ' +
			'(две подписи, одна отредактирована через панель ' +
			'редактирования с картинкой, вторая по умолчанию - обычный текст) ' +
			'и что она не меняется в цитировании'
		}
	}
};

require('./TESTMAIL-33029');
