'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/password/restore/account');
let AccessSteps = require('../../../steps/password/restore/access');
let SelectSteps = require('../../../steps/password/restore/select');

let accountSteps = new AccountSteps();
let accessSteps = new AccessSteps();
let selectSteps = new SelectSteps();

let { options = {
	name: 'Восстановление пароля. Ввод скрытых цифр телефона. ' +
	'Проверить получение ошибки при пустом поле ввода'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;
let values = ['', '1'];

describe(() => {
	before(() => {
		user = AccountSteps.createUser({
			phones: 1,
			mrim: options.name
		});
	});

	beforeEach(() => {
		accountSteps.openForEmail(user.email);
		steps.wait();
	});

	values.forEach(value => {
		it(options.name, () => {
			let captcha = steps.getPhoneCaptchaValue();

			steps.fillPhoneInput(value);
			steps.fillPhoneCaptcha(captcha);
			steps.submitForm();

			steps.checkTabError('Пожалуйста, введите недостающие цифры');
			steps.checkPhoneCaptcha(captcha, false);
		});
	});
});
