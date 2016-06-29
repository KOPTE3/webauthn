'use strict';

let PasswordRestorePage = require('../../steps/passrestore');

describe.skip('TESTMAIL-31530: Восстановление пароля', () => {
	it('Проверить ввод кириллицы, латиницы и спецсимволов с клавиатуры', () => {
		PasswordRestorePage.open();
	});
});
