'use strict';

let PasswordRestore = require('../../../steps/password/restore');
let accountView = require('../../../steps/password/restore/account');
let selectTypeView = require('../../../steps/password/restore/selectType');

let assert = require('assert');

describe('TESTMAIL-XXXX', function () {
	it('Открытие стрницы восстановления пароля', function () {
		let restoreEmail = 'regtest14@mail.ru';

		this.timeout(100000); // Разгадываем капчу
		PasswordRestore.open();

		accountView.initRegTokenIdLog(); // start "recording"

		accountView.setEmail(restoreEmail);
		accountView.submitForm();
		selectTypeView.waitForPhone();

		browser.debug();

		selectTypeView.fillPhoneCaptcha();
		selectTypeView.submitForm();

		browser.debug();

		selectTypeView.waitForPhoneLayer();
		selectTypeView.fillSmsCode(restoreEmail);

		browser.debug();
	});
});
