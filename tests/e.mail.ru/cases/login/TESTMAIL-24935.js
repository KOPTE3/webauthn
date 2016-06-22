'use strict';

let assert = require('assert');
let login = require('../../steps/login');

describe('TESTMAIL-24935', () => {
	it('Проверка отображения элементов на форме авторизации', () => {
		login.open();
		login.getActiveDomain('mail.ru');
		login.checkTitle();
		login.checkDescription();
		login.checkPassRemindLink();
		login.checkHelpText();
		login.checkHelpLink();
		login.checkRememberText();
		login.checkRememberState();
	});

	// let providers = browser
	// 	.elements(page.locator.providersBlock)
	// 	.getAttribute('data-domain');
	//
	// let result = page.providers.every((value, index) => {
	// 	return value === providers[index];
	// });
	//
	// assert(result);
});
