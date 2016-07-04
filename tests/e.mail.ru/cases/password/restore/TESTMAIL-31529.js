'use strict';

let PasswordRestorePage = require('../../../steps/password/restore');

describe.skip('TESTMAIL-31529: Восстановление пароля (MRIM)', () => {
	it('Проверить ввод кириллицы, латиницы и спецсимволов с клавиатуры', () => {
		PasswordRestorePage.open();
	});
});
