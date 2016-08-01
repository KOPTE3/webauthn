'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/passrestore/account');
let AccessSteps = require('../../../steps/passrestore/access');
let SelectSteps = require('../../../steps/passrestore/select');
let phoneStore = require('../../../store/phones');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let accessSteps = new AccessSteps();

let { options = {
	name: 'Восстановление пароля. Ввод скрытых цифр телефона. ' +
	'Проверить ввод некорректных цифр'
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
		let incorrect = phoneStore.getIncorrectValue(user.phones[0].value);
		let captcha = steps.getPhoneCaptchaValue();

		steps.fillPhoneInput(incorrect);
		steps.fillPhoneCaptcha(captcha);
		steps.submitForm();

		steps.checkTabError('Вы указали неправильный номер телефона');
		steps.checkPhoneCaptcha(captcha, false);
	});
});
