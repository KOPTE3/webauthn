'use strict';

let page = require('../../steps/compose');
let fields = require('../../steps/compose/fields');

describe('TESTMAIL-XXXX', () => {
	it('Открытие страницы написания письма', () => {
		page.auth();
		page.open();
		fields.showAllFields();
	});
});
