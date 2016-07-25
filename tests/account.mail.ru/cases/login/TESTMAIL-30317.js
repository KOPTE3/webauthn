'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');

let loginForm = new LoginForm();

describe('TESTMAIL-30317', () => {
	it('Проверить отсутствие кнопки "Забыли пароль?" для внешних аккаунтов', () => {
		LoginPage.open({ allow_external: 1 });
		loginForm.isPassRemindLinkNotExist();
	});
});
