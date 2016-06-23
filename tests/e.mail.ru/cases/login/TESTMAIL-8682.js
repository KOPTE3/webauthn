'use strict';

let assert = require('assert');

let login = require('../../steps/login');
let form = require('../../steps/login/form');
let providers = require('../../store/login/providers');

describe('TESTMAIL-8682', () => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		login.open();

		providers.active.forEach(({ name }) => {
			form.setLogin(`example@${name}`);
			form.getActiveDomain(name);
		});
	});
});
