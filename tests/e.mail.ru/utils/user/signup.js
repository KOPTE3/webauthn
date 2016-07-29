'use strict';

let faker = require('faker');
let account = require('../account');
let providers = require('../../store/authorization/providers');
let phonesStore = require('../../store/phones').phones;

/** Модуль регистрации пользователя */
module.exports = {
	get login () {
		return 'regtest_' + faker.internet.domainWord() + faker.random.number(100);
	},

	get domain () {
		let {hosts} = providers.get(['mail.ru'])[0];

		return faker.helpers.randomize(hosts);
	},

	generatePassword (length = 10) {
		let symbols = '0123456789' +
			'abcdefghiklmnopqrstuvwxyz' +
			'ABCDEFGHIJKLMNOPQRSTUVWXTZ' +
			'!@#$%^&*()-_+=;:,./?\\|`~[]{}';

		let randomItems = (string, length) => {
			return Array.from(
				{length},
				() => faker.helpers.randomize(string)
			);
		};

		return randomItems(symbols, length).join('');
	},

	get birthday () {
		let date = faker.date.past(40);

		return {
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear()
		};
	},

	get name () {
		return {
			first: faker.name.firstName(),
			last: faker.name.lastName()
		};
	},

	get sex () {
		return faker.helpers.randomize(['male', 'female']);
	},

	bindPhones (phones) {
		if (Array.isArray(phones)) {
			return phones;
		}

		let phoneNumbers = [phonesStore[0].phone];

		if (phones === 2) {
			phoneNumbers.push(phonesStore[1].phone);
		}

		phoneNumbers = phoneNumbers.map(phone => ({
			phone,
			visibility: 'visible',
			country: 'ru',
			mobile: true
		}));

		return phoneNumbers;
	},

	bindRestore (restore) {
		let restoreData = {
			secret: faker.lorem.sentence(),
			secret_answer: faker.lorem.word()
		};

		if (typeof restore === 'object') {
			restoreData = Object.assign({}, restoreData, restore);
		}

		return restoreData;
	},

	generateSignupData (params) {
		let {phones, restore, mrim, credentials = {}} = params;
		let {login, domain, name, birthday, sex} = this;
		let data = {
			login,
			domain,
			name,
			birthday,
			sex,
			lang: 'ru_RU',
			password: this.generatePassword()
		};

		data = Object.assign({}, data, credentials);

		if (phones) {
			data.phones = this.bindPhones(phones);
		}

		if (restore) {
			data.restore = this.bindRestore(restore);
		}

		if (mrim) {
			data.flags = {
				mrim_disabled: true
			};
		}

		return data;
	}
};
