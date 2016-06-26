'use strict';

let page = require('../../steps/compose');
let form = require('../../steps/compose/form');

describe('TESTMAIL-XXXX', () => {
	it('Открытие страницы написания письма', () => {
		page.auth();
		page.open();
		form.showAllFields();
	});
});
