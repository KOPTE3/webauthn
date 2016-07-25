'use strict';

let AccountSteps = require('../../../steps/password/restore/account');
let SelectSteps = require('../../../steps/password/restore/select');
let RecoverySteps = require('../../../steps/password/restore/recovery');
let usersStore = require('../../../store/password/restore/users');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let recoverySteps = new RecoverySteps();

describe('TESTMAIL-31514: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {
	it('Проверка отображения введеных пользователем цифр ' +
		'телефона в попапе ввода кода из смс', () => {
		const user = usersStore.simple.one;

		accountSteps.openForEmail(user.email);

		selectSteps.wait();
		selectSteps.fillPhoneInput(user.phone.value);
		selectSteps.fillPhoneCaptcha();
		selectSteps.submitForm();

		selectSteps.waitForPhoneLayer();
		selectSteps.checkPhoneLayer(user.phone.head, user.phone.value);
	});
});
