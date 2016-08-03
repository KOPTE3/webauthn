'use strict';

let AccountSteps = require('../../../steps/passrestore/account');
let AccessSteps = require('../../../steps/passrestore/access');
let SelectSteps = require('../../../steps/passrestore/select');
let userUtils = require('../../../utils/user');

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
		user = userUtils.add({ phones: 1 });
		userUtils.mrim(user.email, options.mrim);
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
