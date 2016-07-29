'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/password/restore/account');
let AccessSteps = require('../../../steps/password/restore/access');
let SelectSteps = require('../../../steps/password/restore/select');
let phoneStore = require('../../../store/phones');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let accessSteps = new AccessSteps();

let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

let {options = {
	name: 'Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Проверить ввод некорректных цифр'
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
		let incorrect = phoneStore.getIncorrectValue(user.phones[0].value);
		let captcha = steps.getPhoneCaptchaValue();

		steps.fillPhoneInput(incorrect);
		steps.fillPhoneCaptcha(captcha);
		steps.submitForm();

		steps.checkTabError('Вы указали неправильный номер телефона');
		steps.checkPhoneCaptcha(captcha, false);
	});
});
