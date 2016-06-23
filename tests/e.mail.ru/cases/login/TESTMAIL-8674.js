'use strict';

let page = require('../../steps/login');
let form = require('../../steps/login/form');
let providers = require('../../store/login/providers');

describe('TESTMAIL-8674', () => {
	it('Выделение соответствующей иконки домена при выборе домена в списке', () => {
		page.open();

		providers.active.forEach(({ name }) => {
			form.selectDomain(name);
			form.getActiveDomain(name);
		});
	});
});
