export interface Phone {
	index: number;
	phone: string;
	head: string;
	code?: string;
	value: string;
	masked: string;
	full: string;
	id: string;
	operator: Operators;
}

export enum Operators {
	MTS = 'MTS',
	MEGAFON = 'MEGAFON',
	BEELINE = 'BEELINE',
	TELE2 = 'TELE2',
	YOTA = 'YOTA'
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
			id: 'id_KPFVb+EGhXQDWjPNlISdwcXnWMNNZbnW71ZqFCZZx0Q=',
			operator: Operators.MTS
		},
		{
			index: 1,
			phone: '79163870193',
			head: '+7 (916) 3',
			value: '87',
			masked: '+7 (916) 387-**-**',
			full: '+7 (916) 387-01-93',
			id: 'id_VIfcT9mStAJvebvZnTVXMaKQw14zkKBzYd7x0Z1ZUto=',
			operator: Operators.MTS
		},
		{
			index: 2,
			phone: '79851017720',
			head: '+7 (985) 1',
			value: '01',
			masked: '+7 (985) 101-**-**',
			full: '+7 (985) 101-77-20',
			id: 'id_ejzdMW603/dDmpnW7dKf+ZPuhStkdVPSq+OgPl9wNPY=',
			operator: Operators.MTS
		},
		{
			index: 3,
			phone: '79262361785',
			head: '+7 (926) 2',
			value: '36',
			masked: '+7 (926) 236-**-**',
			full: '+7 (926) 236-17-85',
			id: 'id_16TLfv1RUmqxc2Q0owULC7vBF952pPI2dj4+G3TY4N0=',
			operator: Operators.MEGAFON
		},
		{
			index: 4,
			phone: '79262399073',
			head: '+7 (926) 2',
			value: '39',
			masked: '+7 (926) 239-**-**',
			full: '+7 (926) 239-90-73',
			id: 'id_5v4tDsAhbWIqigK8dmUsGDtIPi8Gs4uyWEBBzTVkln8=',
			operator: Operators.MEGAFON
		},
		{
			index: 5,
			phone: '79265299551',
			head: '+7 (926) 5',
			value: '29',
			masked: '+7 (926) 529-**-**',
			full: '+7 (926) 529-95-51',
			id: 'id_HE48M+yRv/dtupq3WxUavdV3aOIaLTLJf0QVlz0A3Fk=',
			operator: Operators.MEGAFON
		},
		{
			index: 6,
			phone: '79998689153',
			head: '+7 (999) 8',
			value: '68',
			masked: '+7 (999) 868-**-**',
			full: '+7 (999) 868-91-53',
			id: 'id_NbtbzhB4ZySdx5OcaNT5gOvlDPvLIuP0009Uar4eqrY=',
			operator: Operators.YOTA
		}
	] as PhoneList,

	// список телефонов, которые гейт сразу отправляет на callui, и для которых недоступна отправка sms
	calluiPhones: [
		{
			index: 0,
			phone: '79851017720',
			code: '491519',
			head: '+7 (985) 1',
			value: '01',
			masked: '+7 (985) 101-**-**',
			full: '+7 (985) 101-77-20',
			id: 'id_ejzdMW603/dDmpnW7dKf+ZPuhStkdVPSq+OgPl9wNPY=',
			operator: Operators.MTS
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

	getPhone(index?: number): Phone {
		if (typeof index === 'number') {
			return this.phones[index];
		}
		const length = this.phones.length;
		return this.phones[Math.floor(Math.random() * length)];
	},

	getCalluiPhone(index = 0): Phone {
		return this.calluiPhones[index];
	},

	getPhoneByOperator(operator: Operators): Phone | null {
		const variants = this.phones.filter((phone: Phone) => phone.operator === operator);
		if (variants.length === 0) {
			return null;
		}

		return variants[Math.floor(Math.random() * variants.length)];
	}
};
