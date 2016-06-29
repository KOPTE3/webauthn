'use strict';

let PasswordRestorePage = require('../../steps/passrestore');

describe.skip('TESTMAIL-31481: Восстановление пароля', () => {
	it('Выбор номера телефона для восстановления', () => {
		PasswordRestorePage.open();
	});
});
