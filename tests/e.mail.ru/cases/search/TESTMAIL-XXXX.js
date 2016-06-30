'use strict';

let Search = require('../../steps/search');

describe('TESTMAIL-XXX', () => {
	it('Открытие стрницы поиска по файлам', () => {
		Search.auth();
		Search.open();
	});
});
