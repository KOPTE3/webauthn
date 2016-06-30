'use strict';

let PasswordRestorePage = require('../../../steps/password/restore');

describe.skip('TESTMAIL-31526: Восстановление пароля', () => {
	it('Проверить отсутствие возможности ввести более двух цифр', () => {
		PasswordRestorePage.open();
	});
});
