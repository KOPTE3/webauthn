'use strict';

let Compose = require('../../steps/compose');
let composeFields = require('../../steps/compose/fields');
let composeControls = require('../../steps/compose/controls');

describe('TESTMAIL-XXXX', () => {
	it('Открытие страницы написания письма', () => {
		Compose.auth();
		Compose.open();
		composeFields.showAllFields();
		composeControls.draft();
	});
});
