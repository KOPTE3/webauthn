'use strict';

let assert = require('assert');

let login = require('../../steps/login'),
	store = require('../../store/collectors');

describe('TESTMAIL-8675', () => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		login.open();

		let providers = store.providers.get([
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
