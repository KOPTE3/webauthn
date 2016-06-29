'use strict';

let page = require('../../steps/passrestore');
let accountView = require('../../steps/passrestore/account');
let slectTypeView = require('../../steps/passrestore/selectType');

let assert = require('assert');

describe('TESTMAIL-XXXX', () => {
	it('Открытие стрницы восстановления пароля', () => {
		page.open();
		accountView.setEmail('iketari@mail.ru');
		accountView.submitForm();
		slectTypeView.waitForPhone();
		slectTypeView.fillPhoneCaptcha();
	});
});
