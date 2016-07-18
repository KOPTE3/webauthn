'use strict';

let SelectSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');
let passwordStore = require('../../../store/password/restore');

let selectSteps = new SelectSteps();
let {symbols} = passwordStore;

describe('TESTMAIL-31529: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {
	beforeEach(() => {
		selectSteps.open(usersStore.simple.one.email);
	});

	it('Проверить ввод кириллицы, латиницы и спецсимволов с клавиатуры', () => {
		selectSteps.fillPhoneInput(symbols.cyrillic);
		selectSteps.checkPhoneInput('');
	});

	it('Проверить ввод латиницы', () => {
		selectSteps.fillPhoneInput(symbols.latin);
		selectSteps.checkPhoneInput('');
	});

	it('Проверить ввод специальных символов', () => {
		symbols.special.forEach(symbol => {
			selectSteps.fillPhoneInput(symbol);
			selectSteps.checkPhoneInput('');
		});
	});
});
