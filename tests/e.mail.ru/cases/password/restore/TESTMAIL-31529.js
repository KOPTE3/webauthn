'use strict';

let path = require('path');

let AccountSteps = require('../../../steps/password/restore/account');
let AccessSteps = require('../../../steps/password/restore/access');
let SelectSteps = require('../../../steps/password/restore/select');
let passwordStore = require('../../../store/password/restore');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let accessSteps = new AccessSteps();

let name = path.basename((module.parent.options ? module.parent : module).filename, '.js');

let {options = {
	name: 'Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Проверить ввод кириллицы, латиницы и спецсимволов с клавиатуры'
}} = module.parent;

let user = {};
let steps = options.mrim ? accessSteps : selectSteps;
let {symbols} = passwordStore;

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
