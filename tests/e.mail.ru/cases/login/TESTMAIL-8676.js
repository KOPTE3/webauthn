'use strict';

let page = require('../../steps/login');
let form = require('../../steps/login/form');

describe('TESTMAIL-8676', () => {
	it('Отсутствие списка доменов при выборе иконки домена "Другие"', () => {
		page.open();
		form.clickByDomain('other');
		form.isSelectVisible();
	});
});
