'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/passrestore/account');
let AccessSteps = require('../../../steps/passrestore/access');
let SelectSteps = require('../../../steps/passrestore/select');
let RecoverySteps = require('../../../steps/passrestore/recovery');

let accountSteps = new AccountSteps();
let accessSteps = new AccessSteps();
let selectSteps = new SelectSteps();

let { options = {
	name: 'Восстановление пароля. Ввод скрытых цифр телефона. ' +
	'Проверка отображения введеных пользователем цифр ' +
	'телефона в попапе ввода кода из смс'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;

describe(() => {
	before(() => {
		user = AccountSteps.createUser({
			phones: 1,
			mrim: options.mrim
		});
	});

	beforeEach(() => {
		accountSteps.openForEmail(user.email);
		steps.wait();
	});

	it(options.name, () => {
		let phone = user.phones[0];

		steps.fillPhoneInput(phone.value);
		steps.fillPhoneCaptcha();
		steps.submitForm();

		steps.waitForPhoneLayer();
		steps.checkPhoneLayerInfo(phone.head, phone.value);
	});
});
