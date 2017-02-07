'use strict';

/**
 * Безлимитные телефоны
 * @global
 * @module "@qa/yoda/store/phones"
 */
module.exports = {
	phones: [
		{
			index: 0,
			phone: '79162143406',
			head: '+7 (916) 2',
			value: '14',
			masked: '+7 (916) 214-**-**',
			id: 'id_KPFVb+EGhXQDWjPNlISdwcXnWMNNZbnW71ZqFCZZx0Q='
		},
		{
			index: 1,
			phone: '79163870193',
			head: '+7 (916) 3',
			value: '87',
			masked: '+7 (916) 387-**-**',
			id: 'id_VIfcT9mStAJvebvZnTVXMaKQw14zkKBzYd7x0Z1ZUto='
		}
	],

	/**
	 * Получение номера телефона
	 * @param {number} [index]
	 * @returns {string}
	 */
	getNumber (index = 0) {
		return this.phones[index].phone;
	}
};
