'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/password/restore/account');
let SelectSteps = require('../../../steps/password/restore/select');
let RecoverySteps = require('../../../steps/password/restore/recovery');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();

let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

let {options = {
	name: 'Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Проверка отображения введеных пользователем цифр ' +
	'телефона в попапе ввода кода из смс'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;

describe(name, () => {
	before(() => {
		user = AccountSteps.addUser({
			phones: 1,
			mrim: options.mrim
		});
	});

	beforeEach(() => {
		accountSteps.openForEmail(user.email);
		steps.wait();
	});

	it(params.name, () => {
		let phone = user.phones[0];

		steps.fillPhoneInput(phone.value);
		steps.fillPhoneCaptcha();
		steps.submitForm();

		steps.waitForPhoneLayer();
		steps.checkPhoneLayer(phone.head, phone.value);
	});
});
