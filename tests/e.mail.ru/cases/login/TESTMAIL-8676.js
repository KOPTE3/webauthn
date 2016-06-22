'use strict';

let assert = require('assert');
let login = require('../../steps/login');

describe('TESTMAIL-8676', () => {
	it('Отсутствие списка доменов при выборе иконки домена "Другие"', () => {
		login.open();
		login.clickByDomain('other');
		login.isSelectVisible();
	});
});
