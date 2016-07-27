'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/password/restore/account');
let AccessSteps = require('../../../steps/password/restore/access');
let SelectSteps = require('../../../steps/password/restore/select');

let accountSteps = new AccountSteps();
let accessSteps = new AccessSteps();
let selectSteps = new SelectSteps();

let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

let {options = {
	name: 'Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Проверить получение ошибки при пустом поле ввода'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;

describe(name, () => {
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

	it(options.name, () => {
		let captcha = steps.getPhoneCaptchaValue();

		steps.fillPhoneCaptcha(captcha);
		steps.submitForm();

		steps.checkTabError('Вы указали неправильный номер телефона');
		steps.checkPhoneCaptcha(captcha, false);
	});
});
