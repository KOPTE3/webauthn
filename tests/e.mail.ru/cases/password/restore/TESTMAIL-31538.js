'use strict';

let PasswordRestorePage = require('../../steps/passrestore');

describe.skip('TESTMAIL-31538: Восстановление пароля', () => {
	it('Проверка отображения номера телефона на странице ввода капчи', () => {
		PasswordRestorePage.open();
	});
});
