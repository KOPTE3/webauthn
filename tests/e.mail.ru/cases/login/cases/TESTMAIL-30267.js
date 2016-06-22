'use strict';

let assert = require('assert');
let page = require('../page');

describe('TESTMAIL-8679', () => {
	it('Страница логина. Отображение ошибки errno=10', () => {
		page.open('/login?errno=10');

		let active = browser.getText(page.locator.error);

		assert(active, 'Ошибка! Повторите попытку через некоторое время.');
	});
});
