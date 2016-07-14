'use strict';

let AccessSteps = require('../../../steps/password/restore/access');
let usersStore = require('../../../store/password/restore/users');

let accessSteps = new AccessSteps();

describe.skip('TESTMAIL-31526: mrim. Вериф телефон. ' +
	'Ввод скрытых цифр телефона.', () => {
	it('Проверить отсутствие возможности ввести более двух цифр', () => {
		accessSteps.open(usersStore.mrim.one);
		accessSteps.fillPhoneInput('123');
		accessSteps.checkPhoneInput('12');
	});
});
