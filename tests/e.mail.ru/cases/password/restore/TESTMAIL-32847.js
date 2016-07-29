'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/password/restore/account');
let AccessSteps = require('../../../steps/password/restore/access');
let SelectSteps = require('../../../steps/password/restore/select');
let RecoverySteps = require('../../../steps/password/restore/recovery');

let accountSteps = new AccountSteps();
let accessSteps = new AccessSteps();
let selectSteps = new SelectSteps();

let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

let {options = {
	name: 'Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Проверка наличия кнопки "Отправить код еще раз"' +
	'в попапе ввода кода из смс'
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
		let phone = user.phones[0];

		steps.fillPhoneInput(phone.value);
		steps.fillPhoneCaptcha();
		steps.submitForm();

		steps.waitForPhoneLayer();
		steps.checkPhoneLayerLink('Отправить код еще раз');
	});
});
