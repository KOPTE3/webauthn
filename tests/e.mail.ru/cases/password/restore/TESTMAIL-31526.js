'use strict';

let PasswordRestorePage = require('../../steps/passrestore');

describe.skip('TESTMAIL-31526: Восстановление пароля', () => {
	it('Проверить отсутствие возможности ввести более двух цифр', () => {
		PasswordRestorePage.open();
	});
});
