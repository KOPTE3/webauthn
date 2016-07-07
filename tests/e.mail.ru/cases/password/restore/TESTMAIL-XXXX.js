'use strict';

let PasswordRestore = require('../../../steps/password/restore');
let accountView = require('../../../steps/password/restore/account');
let slectTypeView = require('../../../steps/password/restore/selectType');

let assert = require('assert');

describe('TESTMAIL-XXXX', function () {
	it('Открытие стрницы восстановления пароля', function () {
		this.timeout(100000); // Разгадываем капчу
		PasswordRestore.open();

		accountView.initRegTokenIdLog(); // start "recording"

		accountView.setEmail('iketari@mail.ru');
		accountView.submitForm();
		slectTypeView.waitForPhone();

		slectTypeView.fillPhoneCaptcha();
		slectTypeView.submitForm();
		// slectTypeView.fillPhoneCode();

		browser.debug();
	});
});
