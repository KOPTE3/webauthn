'use strict';

let assert = require('assert');
let login = require('../../steps/login');

describe('TESTMAIL-8682', () => {
	it('Выделение соответствующей иконки домена при вводе email с доменом', () => {
		login.open();

		let providers = store.providers.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com'
		]);

		providers.forEach(({ name }) => {
			login.fill({
				Login: `example@${name}`
			});

			login.getActiveDomain(name);
		});
	});
});
