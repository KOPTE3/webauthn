'use strict';

let page = require('../../steps/login');
let form = require('../../steps/login/form');

describe('TESTMAIL-24935', () => {
	it('Проверка отображения элементов на форме авторизации', () => {
		page.open();

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
