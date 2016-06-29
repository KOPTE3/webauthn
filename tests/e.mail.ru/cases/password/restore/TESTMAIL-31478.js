'use strict';

let PasswordRestorePage = require('../../steps/passrestore');

describe.skip('TESTMAIL-31478: Восстановление пароля', () => {
	it('Ввод скрытых цифр телефона', () => {
		PasswordRestorePage.open();
	});
});
