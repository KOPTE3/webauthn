'use strict';

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
	'Проверка отображения номера телефона на странице ввода капчи'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;

describe(() => {
	before(() => {
		user = userUtils.add({ phones: 1 });
		userUtils.mrim(user.email, options.mrim);
	});

	it(options.name, () => {
		accountSteps.openForEmail(user.email);
		steps.wait();
		steps.checkPhone(user.phones[0].head, '');
	});
});
