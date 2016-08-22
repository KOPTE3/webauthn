'use strict';

module.options = {
	signatures: [
		{image: false, isDefault: true},
		{image: false}
	],
	overrideTests: {
		'TESTMAIL-32988': {
			testcase: 'TESTMAIL-32991',
			name: 'Написание письма. HTML подпись. AJAX. Проверка смены подписи ' +
			'(две подписи, обычный текст)'
		},

		'TESTMAIL-32995': {
			testcase: 'TESTMAIL-32998',
			name: ' Полный ответ на письмо. HTML подпись. AJAX. Проверка смены подписи ' +
			'(две подписи, обычный текст) и что она не меняется в цитировании'
		},

		'TESTMAIL-33005': {
			testcase: 'TESTMAIL-33008',
			name: 'Полный ответ на письмо. HTML подпись. НЕ AJAX. Проверка смены подписи ' +
			'(две подписи, обычный текст) и что она не меняется в цитировании'
		}
	}
};

require('./TESTMAIL-32988-32995-33005');
