'use strict';

let SelectSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');

let selectSteps = new SelectSteps();

let user = usersStore.simple.two;

const phone1 = user.phones[0];
const phone2 = user.phones[1];

describe('TESTMAIL-31481: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона. ' +
	'Выбор номера телефона, на который вы хотите ' +
	'получить код восстановления (два телефона)', () => {
	beforeEach(() => {
		selectSteps.open(user.email);
	});

	it('Проверка начального состояния', () => {
		selectSteps.phoneInputIsActive(phone1.index, phone1.head, '');
		selectSteps.phoneInputIsDisabled(phone2.index, phone2.head);
	});

	it('Переключение телефонов', () => {
		const value = '11';

		selectSteps.fillPhoneInput(value, phone1.index);

		selectSteps.selectPhoneInput(phone2.index);
		selectSteps.phoneInputIsActive(phone2.index, phone2.head, '');
		selectSteps.phoneInputIsDisabled(phone1.index, phone1.head);

		selectSteps.selectPhoneInput(phone1.index);
		selectSteps.phoneInputIsActive(phone1.index, phone1.head, value);
		selectSteps.phoneInputIsDisabled(phone2.index, phone2.head);
	});
});
