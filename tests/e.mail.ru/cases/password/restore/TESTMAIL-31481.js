'use strict';

let PasswordRestorePage = require('../../../steps/password/restore');

describe.skip('TESTMAIL-31481: Восстановление пароля', () => {
	it('Выбор номера телефона для восстановления', () => {
		PasswordRestorePage.open();
	});
});
