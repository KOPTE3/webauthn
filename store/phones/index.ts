'use strict';

export interface Phone {
	index: number,
	phone: string,
	head: string,
	value: string,
	masked: string,
	id: string
}

type PhoneList = Phone[];

/**
 * Безлимитные телефоны
 * @global
 * @module "@qa/yoda/store/phones"
 */
export default {
	phones: <PhoneList>[
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
	getNumber (index: number = 0): string {
		return this.phones[index].phone;
	}
};
