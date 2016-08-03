'use strict';

let AccountSteps = require('../../../steps/passrestore/account');
let AccessSteps = require('../../../steps/passrestore/access');
let SelectSteps = require('../../../steps/passrestore/select');
let userUtils = require('../../../utils/user');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let accessSteps = new AccessSteps();

let { options = {
	name: 'Восстановление пароля. Ввод скрытых цифр телефона. ' +
	'Проверить отсутствие возможности ввести более двух цифр'
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
		steps.fillPhoneInput('123');
		steps.checkPhoneInput('12');
	});
});
