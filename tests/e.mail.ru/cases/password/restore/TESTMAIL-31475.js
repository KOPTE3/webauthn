'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/password/restore/account');
let AccessSteps = require('../../../steps/password/restore/access');
let SelectSteps = require('../../../steps/password/restore/select');
let RecoverySteps = require('../../../steps/password/restore/recovery');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let accessSteps = new AccessSteps();
let recoverySteps = new RecoverySteps();

let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

let {options = {
	name: 'Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Ввод корректных данных.'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;

describe(name, () => {
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
		steps.fillPhoneInput(user.phones[0].value);
		steps.fillPhoneCaptcha();
		steps.submitForm();

		steps.waitForPhoneLayer();
		steps.fillSmsCode(user.email);
		steps.submitPhoneLayer();
		recoverySteps.wait();
	});
});
