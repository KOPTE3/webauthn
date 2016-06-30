'use strict';

let PasswordRestorePage = require('../../../steps/password/restore');

describe.skip('TESTMAIL-31538: Восстановление пароля', () => {
	it('Проверка отображения номера телефона на странице ввода капчи', () => {
		PasswordRestorePage.open();
	});
});
