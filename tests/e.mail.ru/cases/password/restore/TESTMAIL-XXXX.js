'use strict';

let PasswordRestore = require('../../../steps/password/restore');
let AccountView = require('../../../steps/password/restore/account');
let SelectTypeView = require('../../../steps/password/restore/select');

let accountView = new AccountView();
let selectTypeView = new SelectTypeView();


describe.skip('TESTMAIL-XXXX', function () {
	it('Регистрация нового пользователя', () => {
		let user = AccountView.createUser({
			phones: 2
		});

		accountView.openForEmail(user.email);
	});

	it.skip('Открытие стрницы восстановления пароля', () => {
		let restoreEmail = 'regtest17@mail.ru';

		this.timeout(100000); // need for debug
		PasswordRestore.open();

		accountView.initRegTokenIdLog(); // start XHR "recording"

		accountView.setEmail(restoreEmail);
		accountView.submitForm();
		selectTypeView.waitForPhoneTab();
		selectTypeView.fillPhoneCaptcha(); // cracking code of captcha

		selectTypeView.submitForm();

		selectTypeView.waitForPhoneLayer();
		selectTypeView.fillSmsCode(restoreEmail); // cracking code in sms
		// browser.debug(); // Check that everything is all right!
	});

	it('Верификация номера телефона', () => {
		let restoreEmail = 'regtest_phone_2@mail.ru';
		let phone = '79154942271';

		selectTypeView.open(restoreEmail);
		selectTypeView.verifyPhone(restoreEmail, phone);
		SelectTypeView.refresh();
	});
});
