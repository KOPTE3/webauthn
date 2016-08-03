'use strict';

let AccountSteps = require('../../../steps/passrestore/account');
let AccessSteps = require('../../../steps/passrestore/access');
let SelectSteps = require('../../../steps/passrestore/select');
let passwordStore = require('../../../store/passrestore');
let userUtils = require('../../../utils/user');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let accessSteps = new AccessSteps();

let { options = {
	name: 'Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Проверить ввод кириллицы, латиницы и спецсимволов с клавиатуры'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;
let {symbols} = passwordStore;

describe(() => {
	before(() => {
		user = userUtils.add({ phones: 1 });
		userUtils.mrim(user.email, options.mrim);
	});

	beforeEach(() => {
		accountSteps.openForEmail(user.email);
		steps.wait();
	});

	it(options.name + ': Проверить ввод кириллицы', () => {
		steps.fillPhoneInput(symbols.cyrillic);
		steps.checkPhoneInput('');
	});

	it(options.name + ': Проверить ввод латиницы', () => {
		steps.fillPhoneInput(symbols.latin);
		steps.checkPhoneInput('');
	});

	it(options.name + ': Проверить ввод специальных символов', () => {
		symbols.special.forEach(symbol => {
			steps.fillPhoneInput(symbol);
			steps.checkPhoneInput('');
		});
	});
});
