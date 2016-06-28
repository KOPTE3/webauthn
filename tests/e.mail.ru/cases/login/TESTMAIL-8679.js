'use strict';

let LoginPage = require('../../steps/login');
let loginForm = require('../../steps/login/form');

describe('TESTMAIL-8679', () => {
	it('Проверка ошибки при авторизации с пустым полем пароль', () => {
		LoginPage.open();

		loginForm.send({ Login: 'example@mail.ru' });
		loginForm.getError('Поле «Пароль» должно быть заполнено.');
	});
});
