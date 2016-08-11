'use strict';

let PasswordRestore = require('../../../steps/passrestore/index');
let AccountView = require('../../../steps/passrestore/account');
let SelectView = require('../../../steps/passrestore/select');
let AccessView = require('../../../steps/passrestore/access');
let userUtils = require('../../../utils/user/index');

let accountView = new AccountView();
let selectView = new SelectView();
let accessView = new AccessView();

describe.skip(() => {
	it('Регистрация нового пользователя', () => {
		let user = userUtils.add({phones: 2});

		accountView.openForEmail(user.email);
		selectView.wait();
	});

	it('Мрим пользователя', () => {
		let user = userUtils.add({phones: 1});

		userUtils.mrim(user.email, true);

		accountView.openForEmail(user.email);
		accessView.wait();
	});

	it('Взлом капчи и смс', () => {
		let user = userUtils.add({phones: 1});

		PasswordRestore.open();

		accountView.initRegTokenIdLog(); // start XHR "recording"

		accountView.setEmail(user.email);
		accountView.submitForm();
		selectView.waitForPhoneTab();
		selectView.fillPhoneInput(user.phones[0].value);
		selectView.fillPhoneCaptcha(); // cracking code of captcha

		selectView.submitForm();

		selectView.waitForPhoneLayer();
		selectView.fillSmsCode(user.email); // cracking code in sms
		// browser.debug(); // Check that everything is all right!
	});
});
