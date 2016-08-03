'use strict';

let assert = require('assert');
let Steps = require('../../steps');
let InformersPage = require('../../pages/informers');

let authorizationStore = require('../../store/authorization');

let Mail = require('../../utils/mail');

/** Модуль для работы с информерами */
class InformersSteps extends Steps {
	constructor () {
		super();

		this.page = new InformersPage();
	}

	/**
	 * Проверяет видимость информера об отписке
	 */
	isUnsubscribeVisible () {
		let actual = this.page.isUnsubscribeVisible();

		assert(actual, 'Информер отписки должен быть виден');
	}

	/**
	 * Проверяет невидимость информера об отписке
	 */
	isUnsubscribeNotVisible () {
		let actual = this.page.isUnsubscribeVisible(true);

		assert(actual, 'Информер отписки должен быть скрыт');
	}

	sendMessage (senderId) {
		let email = authorizationStore.account.get('email');

		let mail = new Mail({
			from: email,
			to: email,
			headers: {
				'X-Senderinfo': senderId
			},
			subject: 'subject',
			text: 'text'
		});

		mail.send();
	};

}

module.exports = InformersSteps;
