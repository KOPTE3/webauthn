'use strict';

const page = require('../object');
const assert = require('assert');

describe('Passremind. Форма ввода адреса', () => {
	page.open(`/password/restore`);

	it('Корректный заголовок', () => {
		assert.equal(browser.getText(page.accountView.title), 'Восстановление пароля');
	});
});
