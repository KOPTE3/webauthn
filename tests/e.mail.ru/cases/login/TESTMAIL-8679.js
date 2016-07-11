'use strict';

let LoginPage = require('../../steps/login');
let LoginForm = require('../../steps/login/form');

let loginForm = new LoginForm();

describe('TESTMAIL-8679', () => {
	it('Проверка ошибки при авторизации с пустым полем пароль', () => {
		LoginPage.open();

		loginForm.send({ Login: 'example@mail.ru' });
		loginForm.getError('Поле «Пароль» должно быть заполнено.');
	});
});
