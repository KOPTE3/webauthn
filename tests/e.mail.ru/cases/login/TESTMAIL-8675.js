'use strict';

let assert = require('assert');

let login = require('../../steps/login'),
	providers = require('../../store/collectors/providers');

describe('TESTMAIL-8675', () => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		login.open();

		let providers = providers.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com'
		]);

		providers.forEach(({ name }) => {
			login.clickByDomain(name);
			login.getLoginValue(name);
		});
	});
});
