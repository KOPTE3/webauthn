'use strict';

let assert = require('assert');
let login = require('../../steps/login');
let form = require('../../steps/login/form');

describe('TESTMAIL-8679', () => {
	it('Проверка ошибки при авторизации с пустым полем пароль', () => {
		login.open();

		form.send({ Login: 'example@mail.ru' });
		form.getError('Поле «Пароль» должно быть заполнено.');
	});
});