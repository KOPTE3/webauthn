'use strict';

let PasswordRestore = require('../../../steps/password/restore');
let accountView = require('../../../steps/password/restore/account');
let selectTypeView = require('../../../steps/password/restore/selectType');

let assert = require('assert');

describe('TESTMAIL-XXXX', function () {
	it('Открытие стрницы восстановления пароля', function () {
		let restoreEmail = 'regtest17@mail.ru';

		// this.timeout(100000); // need for debug
		PasswordRestore.open();

		accountView.initRegTokenIdLog(); // start XHR "recording"

		accountView.setEmail(restoreEmail);
		accountView.submitForm();
		selectTypeView.waitForPhone();

		selectTypeView.fillPhoneCaptcha(); // cracking code of captcha
		selectTypeView.submitForm();

		selectTypeView.waitForPhoneLayer();
		selectTypeView.fillSmsCode(restoreEmail); // cracking code in sms

		browser.debug();
	});
});
