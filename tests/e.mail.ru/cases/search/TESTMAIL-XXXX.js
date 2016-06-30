'use strict';

let Search = require('../../steps/search');

describe('TESTMAIL-XXXX', () => {
	it('Открытие страницы поиска по файлам', () => {
		Search.auth();
		Search.open();
	});
});
