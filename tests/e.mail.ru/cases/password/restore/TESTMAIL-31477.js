'use strict';

let AccountSteps = require('../../../steps/password/restore/account');
let SelectSteps = require('../../../steps/password/restore/select');
let usersStore = require('../../../store/password/restore/users');

let accountSteps = new AccountSteps();
let selectSteps = new SelectSteps();

describe('TESTMAIL-31477: Восстановление пароля. ' +
	'Ввод скрытых цифр телефона.', () => {
	it('Проверить получение ошибки при пустом поле ввода', () => {
		let user = usersStore.simple.one;
		let captcha;

		accountSteps.openForEmail(user.email);
		selectSteps.wait();

		captcha = selectSteps.getPhoneCaptchaValue();
		selectSteps.fillPhoneCaptcha(captcha);
		selectSteps.submitForm();

		selectSteps.checkTabError('Пожалуйста, введите недостающие цифры.');
		selectSteps.checkPhoneCaptcha(captcha, false);
	});
});
