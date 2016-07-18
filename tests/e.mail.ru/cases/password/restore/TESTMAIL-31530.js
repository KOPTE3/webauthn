'use strict';

let AccessSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');
let passwordStore = require('../../../store/password/restore');

let accessSteps = new AccessSteps();
let {symbols} = passwordStore;

describe('TESTMAIL-31530: mrim. Вериф телефон. ' +
	'Ввод скрытых цифр телефона.', () => {
	beforeEach(() => {
		accessSteps.open(usersStore.mrim.one.email);
	});

	it('Проверить ввод кириллицы, латиницы и спецсимволов с клавиатуры', () => {
		accessSteps.fillPhoneInput(symbols.cyrillic);
		accessSteps.checkPhoneInput('');
	});

	it('Проверить ввод латиницы', () => {
		accessSteps.fillPhoneInput(symbols.latin);
		accessSteps.checkPhoneInput('');
	});

	it('Проверить ввод специальных символов', () => {
		symbols.special.forEach(symbol => {
			accessSteps.fillPhoneInput(symbol);
			accessSteps.checkPhoneInput('');
		});
	});
});
