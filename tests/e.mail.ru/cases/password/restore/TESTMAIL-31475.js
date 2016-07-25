'use strict';

let AccountSteps = require('../../../steps/password/restore/account');
let SelectSteps = require('../../../steps/password/restore/select');
let RecoverySteps = require('../../../steps/password/restore/recovery');
let usersStore = require('../../../store/password/restore/users');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();
let recoverySteps = new RecoverySteps();

describe('TESTMAIL-31475: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {
	it('Ввод корректных данных', () => {
		const user = usersStore.simple.one;

		accountSteps.openForEmail(user.email);

		selectSteps.wait();
		selectSteps.fillPhoneInput(user.phone.value);
		selectSteps.fillPhoneCaptcha();
		selectSteps.submitForm();

		selectSteps.waitForPhoneLayer();
		selectSteps.fillSmsCode(user.email);
		selectSteps.submitPhoneLayer();
		recoverySteps.wait();
	});
});
