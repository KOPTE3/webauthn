'use strict';

let SelectSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');

let selectSteps = new SelectSteps();

describe.skip('TESTMAIL-31481: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Выбор номера телефона, на который вы хотите ' +
	'получить код восстановления (два телефона)', () => {
	beforeEach(() => {
		selectSteps.open(usersStore.simple.two);
	});

	it('Проверка начального состояния', () => {
		selectSteps.phoneInputIsActive(0, '+7 (920) 1', '');
		selectSteps.phoneInputIsDisabled(1, '+7 (909) 2');
	});

	it('Переключение телефонов', () => {
		const phone1 = 0;
		const phone2 = 1;

		selectSteps.fillPhoneInput('11', phone1);

		selectSteps.selectPhoneInput(phone2);
		selectSteps.phoneInputIsActive(phone2, '+7 (920) 2', '');
		selectSteps.phoneInputIsDisabled(phone1, '+7 (920) 1');

		selectSteps.selectPhoneInput(phone1);
		selectSteps.phoneInputIsActive(phone1, '+7 (920) 1', '11');
		selectSteps.phoneInputIsDisabled(phone2, '+7 (920) 2');
	});
});
