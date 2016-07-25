'use strict';

let AccountSteps = require('../../../steps/password/restore/account');
let SelectSteps = require('../../../steps/password/restore/select');
let RecoverySteps = require('../../../steps/password/restore/recovery');
let usersStore = require('../../../store/password/restore/users');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();

describe('TESTMAIL-31476: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {
	it('Проверить ввод некорректных цифр', () => {
		const user = usersStore.simple.one;
		const incorrect = usersStore.getIncorrectValue(user.phone.value);
		let captcha;

		AccountSteps.open();
		accountSteps.initRegTokenIdLog();
		accountSteps.setEmail(user.email);
		accountSteps.submitForm();

		selectSteps.wait();

		captcha = selectSteps.getPhoneCaptchaValue();
		selectSteps.fillPhoneInput(incorrect);
		selectSteps.fillPhoneCaptcha(captcha);
		selectSteps.submitForm();

		selectSteps.checkTabError('Вы указали неправильный номер телефона');
		selectSteps.checkPhoneCaptcha(captcha, false);
	});
});
