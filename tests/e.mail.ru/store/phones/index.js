'use strict';

/** Безлимитные телефоны */
module.exports = {
	phones: [
		{
			phone: '79162143406',
			head: '+7 (916) 2',
			value: '14',
			masked: '+7 (916) 214-**-**',
			id: 'id_KPFVb+EGhXQDWjPNlISdwcXnWMNNZbnW71ZqFCZZx0Q='
		},
		{
			phone: '79163870193',
			head: '+7 (916) 3',
			value: '87',
			masked: '+7 (916) 387-**-**',
			id: 'id_VIfcT9mStAJvebvZnTVXMaKQw14zkKBzYd7x0Z1ZUto='
		}
	],

	getPhones (apiPhones = []) {
		return apiPhones.map(apiPhone => {
			let result = apiPhone;
			let phone;

			phone = this.phones.find(item => {
				return item.phone === apiPhone.phone;
			});

			if (phone) {
				result = Object.assign({}, result, phone);
			}

			return result;
		});
	}
};
