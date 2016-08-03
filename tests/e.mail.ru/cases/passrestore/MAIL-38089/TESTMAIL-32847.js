'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/passrestore/account');
let AccessSteps = require('../../../steps/passrestore/access');
let SelectSteps = require('../../../steps/passrestore/select');
let userUtils = require('../../../utils/user');

let accountSteps = new AccountSteps();
let accessSteps = new AccessSteps();
let selectSteps = new SelectSteps();

let { options = {
	name: 'Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Проверка наличия кнопки "Отправить код еще раз"' +
	'в попапе ввода кода из смс'
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
		let phone = user.phones[0];

		steps.fillPhoneInput(phone.value);
		steps.fillPhoneCaptcha();
		steps.submitForm();

		steps.waitForPhoneLayer();
		steps.checkPhoneLayerLink('Отправить код еще раз');
	});
});
