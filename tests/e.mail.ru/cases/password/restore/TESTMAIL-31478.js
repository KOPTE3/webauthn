'use strict';

let SelectSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');

let selectSteps = new SelectSteps();

describe.skip('TESTMAIL-31478: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {

	it('Проверить отсутствие возможности ввести более двух цифр', () => {
		selectSteps.open(usersStore.simpe.one);
		selectSteps.fillPhoneInput('123');
		selectSteps.checkPhoneInput('12');
	});
});
