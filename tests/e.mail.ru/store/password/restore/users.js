'use strict';

/** Аккаунты для восстановления пароля */
module.exports = {
	simple: {
		one: {
			phone: {
				head: '+7 (915) 1',
				value: '42'
			},
			email: 'regtest94@mail.ru'
		},
		two: {
			phones: [
				{
					index: 0,
					head: '+7 (915) 4',
					value: '94'
				},
				{
					index: 1,
					head: '+7 (915) 1',
					value: '42'
				}
			],
			email: 'regtest_phone_2@mail.ru'
		}
	},

	mrim: {
		one: {
			phone: {
				head: '+7 (909) 2',
				value: '89'
			},
			email: 'test_login_ren5@mail.ru'
		}
	},

	getIncorrectValue (value) {
		let result = +value[0] + 1;

		if (result > 9) {
			result = 0;
		}

		value = result + value[1];

		return value;
	}
};
