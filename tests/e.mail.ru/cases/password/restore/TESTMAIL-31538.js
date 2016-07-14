'use strict';

let SelectSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');

let selectSteps = new SelectSteps();

describe.skip('TESTMAIL-31538: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {
	it('Проверка отображения номера телефона на странице ввода капчи', () => {
		selectSteps.open(usersStore.simple.one);
		selectSteps.checkPhone('+7 (909) 2', '');
	});
});
