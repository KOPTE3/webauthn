'use strict';

let PasswordRestore = require('../../../steps/password/restore');

describe.skip('TESTMAIL-31478: Восстановление пароля', () => {
	it('Ввод скрытых цифр телефона', () => {
		PasswordRestore.open();
	});
});
