'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-30317', () => {
	it('Проверить отсутствие кнопки "Забыли пароль?" для внешних аккаунтов', () => {
		LoginPage.open({ 'allow_external': 1 });
		loginForm.isPassRemindLinkNotExist();
	});
});
