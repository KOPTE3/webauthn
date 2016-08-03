'use strict';

/** Безлимитные телефоны */
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
	 * apiPhones are used in users/add
	 * method maps them to phones from above
	 *
	 * @param {Array} phones: [{phone: '79162143406'}, {..}]
	 * @returns {Array}
	 */
	getPhones (phones = []) {
		return phones.map(phoneItem => {
			let result = phoneItem;
			let phone;

			phone = this.phones.find(item => {
				return item.phone === phoneItem.phone;
			});

			if (phone) {
				result = Object.assign({}, result, phone);
			}

			return result;
		});
	},

	/**
	 * Increases first number of the value
	 * to create incorrect phone value
	 *
	 * @param {string} value: '123'
	 * @returns {string} value '223'
	 */
	getIncorrectValue (value) {
		let result = +value[0] + 1;

		if (result > 9) {
			result = 0;
		}

		value = result + value.slice(1, value.length);

		return value;
	}
};
