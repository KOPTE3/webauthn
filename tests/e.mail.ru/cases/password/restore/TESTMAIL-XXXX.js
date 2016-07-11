'use strict';

let PasswordRestore = require('../../../steps/password/restore');
let AccountView = require('../../../steps/password/restore/account');
let SelectTypeView = require('../../../steps/password/restore/selectType');

let accountView = new AccountView();
let selectTypeView = new SelectTypeView();

let assert = require('assert');

describe('TESTMAIL-XXXX', () => {
	it('Открытие стрницы восстановления пароля', () => {
		PasswordRestore.open();
		accountView.setEmail('iketari@mail.ru');
		accountView.submitForm();
		selectTypeView.waitForPhone();
		selectTypeView.fillPhoneCaptcha();
	});
});
