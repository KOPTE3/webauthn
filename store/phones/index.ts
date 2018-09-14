export interface Phone {
	index: number;
	phone: string;
	head: string;
	value: string;
	masked: string;
	full: string;
	id: string;
}

type PhoneList = Phone[];

/**
 * Безлимитные телефоны
 * @global
 * @module "@qa/yoda/store/phones"
 */
export default {
	phones: [
		{
			index: 0,
			phone: '79162143406',
			head: '+7 (916) 2',
			value: '14',
			masked: '+7 (916) 214-**-**',
			full: '+7 (916) 214-34-06',
			id: 'id_KPFVb+EGhXQDWjPNlISdwcXnWMNNZbnW71ZqFCZZx0Q='
		},
		{
			index: 1,
			phone: '79163870193',
			head: '+7 (916) 3',
			value: '87',
			masked: '+7 (916) 387-**-**',
			full: '+7 (916) 387-01-93',
			id: 'id_VIfcT9mStAJvebvZnTVXMaKQw14zkKBzYd7x0Z1ZUto='
		},
		{
			index: 2,
			phone: '79851017720',
			head: '+7 (985) 1',
			value: '01',
			masked: '+7 (985) 101-**-**',
			full: '+7 (985) 101-77-20',
			id: ''
		},
		{
			index: 3,
			phone: '79262361785',
			head: '+7 (926) 2',
			value: '36',
			masked: '+7 (926) 236-**-**',
			full: '+7 (926) 236-17-85',
			id: ''
		},
		{
			index: 4,
			phone: '79262399073',
			head: '+7 (926) 2',
			value: '39',
			masked: '+7 (926) 239-**-**',
			full: '+7 (926) 239-90-73',
			id: ''
		},
		{
			index: 5,
			phone: '79265299551',
			head: '+7 (926) 5',
			value: '29',
			masked: '+7 (926) 529-**-**',
			full: '+7 (926) 529-95-51',
			id: ''
		}
	] as PhoneList,

	/**
	 * Получение номера телефона
	 * @param {number} [index]
	 * @returns {string}
	 */
	getNumber(index: number = 0): string {
		return this.phones[index].phone;
	},

	getPhone(): Phone {
		const length = this.phones.length;
		return this.phones[Math.floor(Math.random() * length)];
	}
};
