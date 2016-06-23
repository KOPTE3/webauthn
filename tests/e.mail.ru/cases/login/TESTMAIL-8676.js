'use strict';

let login = require('../../steps/login');
let form = require('../../steps/login/form');

describe('TESTMAIL-8676', () => {
	it('Отсутствие списка доменов при выборе иконки домена "Другие"', () => {
		login.open();
		form.clickByDomain('other');
		form.isSelectVisible();
	});
});
