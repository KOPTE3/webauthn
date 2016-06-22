'use strict';

let assert = require('assert');
let login = require('../../steps/login');

describe('TESTMAIL-8679', () => {
	it('Проверка ошибки при авторизации с пустым полем пароль', () => {
		login.open();
		login.send({ Login: 'example@mail.ru' });
		login.getError('Поле «Пароль» должно быть заполнено.');
	});
});
