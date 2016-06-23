'use strict';

let page = require('../../steps/login');
let form = require('../../steps/login/form');

describe('TESTMAIL-8679', () => {
	it('Проверка ошибки при авторизации с пустым полем пароль', () => {
		page.open();

		form.send({ Login: 'example@mail.ru' });
		form.getError('Поле «Пароль» должно быть заполнено.');
	});
});
