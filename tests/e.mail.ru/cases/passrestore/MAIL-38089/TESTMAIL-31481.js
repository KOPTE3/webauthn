'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/passrestore/account');
let AccessSteps = require('../../../steps/passrestore/access');
let SelectSteps = require('../../../steps/passrestore/select');

let accountSteps = new AccountSteps();
let accessSteps = new AccessSteps();
let selectSteps = new SelectSteps();

let { options = {
	name: 'Восстановление пароля. Ввод скрытых цифр телефона. ' +
	'Проверить получение ошибки при пустом поле ввода'
}} = module.parent;

let steps = options.mrim ? accessSteps : selectSteps;
let user = {};
let phone1, phone2;

describe(() => {
	before(() => {
		user = AccountSteps.createUser({
			phones: 2,
			mrim: options.mrim
		});

		phone1 = user.phones[0];
		phone2 = user.phones[1];
	});

	beforeEach(() => {
		accountSteps.openForEmail(user.email);
		steps.wait();
	});

	it(options.name + ': Проверка начального состояния', () => {
		steps.phoneInputIsActive(phone1.index, phone1.head, '');
		steps.phoneInputIsDisabled(phone2.index, phone2.head);
	});

	it(options.name + ': Переключение телефонов', () => {
		const value = '11';

		steps.fillPhoneInput(value, phone1.index);

		steps.selectPhoneInput(phone2.index);
		steps.phoneInputIsActive(phone2.index, phone2.head, '');
		steps.phoneInputIsDisabled(phone1.index, phone1.head);

		steps.selectPhoneInput(phone1.index);
		steps.phoneInputIsActive(phone1.index, phone1.head, value);
		steps.phoneInputIsDisabled(phone2.index, phone2.head);
	});
});
