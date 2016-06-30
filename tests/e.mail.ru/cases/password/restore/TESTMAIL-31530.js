'use strict';

let PasswordRestorePage = require('../../../steps/password/restore');

describe.skip('TESTMAIL-31530: Восстановление пароля', () => {
	it('Проверить ввод кириллицы, латиницы и спецсимволов с клавиатуры', () => {
		PasswordRestorePage.open();
	});
});
