'use strict';

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
	'Проверка отображения номера телефона на странице ввода капчи'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;

describe(name, () => {
	before(() => {
		user = AccountSteps.addUser({
			phones: 1,
			mrim: options.mrim
		});
	});

	it(options.name, () => {
		accountSteps.openForEmail(user.email);
		steps.wait();
		steps.checkPhone(user.phones[0].head, '');
	});
});
