'use strict';

module.options = {
	signatureBeforeText: true,

	signatures: [
		{image: true, isDefault: true},
		{image: false}
	],

	overrideTests: {
		'TESTMAIL-33029': {
			testcase: 'TESTMAIL-33033',
			name: 'Быстрый ответ на письмо. HTML подпись. AJAX. ' +
			'Проверка смены подписи, когда подпись перед цитируемым текстом ' +
			'(две подписи, по умолчанию - отредактирована через панель ' +
			'редактирования с картинкой, вторая - обычный текст) ' +
			'и что она не меняется в цитировании',
		}
	}
};

require('./TESTMAIL-33029');
