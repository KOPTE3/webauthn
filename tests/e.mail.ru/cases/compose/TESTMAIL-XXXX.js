'use strict';

let page = require('../../steps/compose');
let fields = require('../../steps/compose/fields');
let controls = require('../../steps/compose/controls');

describe('TESTMAIL-XXXX', () => {
	it('Открытие страницы написания письма', () => {
		page.auth();
		page.open();
		fields.showAllFields();
		controls.draft();
	});
});
