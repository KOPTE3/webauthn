'use strict';

let PasswordRestore = require('../../../steps/password/restore');
let accountView = require('../../../steps/password/restore/account');
let slectTypeView = require('../../../steps/password/restore/selectType');

let assert = require('assert');

describe('TESTMAIL-XXXX', () => {
	it('Открытие стрницы восстановления пароля', () => {
		PasswordRestore.open();
		accountView.setEmail('iketari@mail.ru');
		accountView.submitForm();
		slectTypeView.waitForPhone();
		slectTypeView.fillPhoneCaptcha();
	});
});
