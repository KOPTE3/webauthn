'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-24935', () => {
	it('Проверка отображения элементов на форме авторизации', () => {
		LoginPage.open();

		loginForm.checkDefaultDomain();
		loginForm.checkTitle();
		loginForm.checkDescription();
		loginForm.checkPassRemindLink();
		loginForm.checkHelpText();
		loginForm.checkHelpLink();
		loginForm.checkRememberText();
		loginForm.checkRememberState();
	});
});
