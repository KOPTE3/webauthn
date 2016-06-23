'use strict';

let assert = require('assert');

let login = require('../../steps/login');
let form = require('../../steps/login/form');
let providers = require('../../store/login/providers');

describe('TESTMAIL-8675', () => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		login.open();

		providers.active.forEach(({ name }) => {
			form.clickByDomain(name);
			form.getLoginValue(name);
		});
	});
});
