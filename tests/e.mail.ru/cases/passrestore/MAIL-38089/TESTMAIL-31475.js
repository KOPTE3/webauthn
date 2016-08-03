'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/passrestore/account');
let AccessSteps = require('../../../steps/passrestore/access');
let SelectSteps = require('../../../steps/passrestore/select');
let RecoverySteps = require('../../../steps/passrestore/recovery');
let userUtils = require('../../../utils/user');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let accessSteps = new AccessSteps();
let recoverySteps = new RecoverySteps();

let { options = {
	name: 'Восстановление пароля. Ввод скрытых цифр телефона. Ввод корректных данных.'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;

describe(() => {
	before(() => {
		user = userUtils.add({ phones: 1 });
		userUtils.mrim(user.email, options.mrim);
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
