'use strict';

let SelectSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');

let selectSteps = new SelectSteps();

describe('TESTMAIL-31478: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {
	it('Проверить отсутствие возможности ввести более двух цифр', () => {
		const user = usersStore.simple.one;

		selectSteps.open(user.email);
		selectSteps.fillPhoneInput('123');
		selectSteps.checkPhoneInput('12');
	});
});
