'use strict';

let SelectSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');

let selectSteps = new SelectSteps();
const user = usersStore.simple.one;

describe('TESTMAIL-31538: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {
	it('Проверка отображения номера телефона на странице ввода капчи', () => {
		selectSteps.open(user.email);
		selectSteps.checkPhone(user.phone.head, '');
	});
});
