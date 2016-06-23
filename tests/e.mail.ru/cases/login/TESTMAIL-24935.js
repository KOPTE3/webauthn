'use strict';

let assert = require('assert');

let login = require('../../steps/login');
let form = require('../../steps/login/form');
let providers = require('../../store/login/providers');

describe('TESTMAIL-24935', () => {
	it('Проверка отображения элементов на форме авторизации', () => {
		login.open();

		form.checkDefaultDomain();
		form.checkTitle();
		form.checkDescription();
		form.checkPassRemindLink();
		form.checkHelpText();
		form.checkHelpLink();
		form.checkRememberText();
		form.checkRememberState();
	});
});
