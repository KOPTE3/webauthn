'use strict';

let assert = require('assert');

let login = require('../../steps/login'),
	store = require('../../store/collectors');

describe('TESTMAIL-8674: Страница логина', () => {
	it('Выделение соответствующей иконки домена при выборе домена в списке', () => {
		login.open();

		let providers = store.providers.get([
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
