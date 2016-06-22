'use strict';

let assert = require('assert');

let login = require('../../steps/login'),
	providers = require('../../store/collectors/providers');

describe('TESTMAIL-8674: Страница логина', () => {
	it('Выделение соответствующей иконки домена при выборе домена в списке', () => {
		login.open();

		let providers = providers.get([
			'mail.ru',
			'yandex.ru',
			'rambler.ru',
			'gmail.com'
		]);

		providers.forEach(({ name }) => {
			login.selectDomain(name);
			login.getActiveDomain(name);
		});
	});
});
