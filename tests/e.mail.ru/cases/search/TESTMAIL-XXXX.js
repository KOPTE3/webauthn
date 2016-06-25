'use strict';

let page = require('../../steps/search');

describe('TESTMAIL-XXX', () => {
	it('Открытие стрницы поиска по файлам', () => {
		page.auth();
		page.open();
	});
});
