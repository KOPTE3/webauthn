'use strict';

let Steps = require('../../../steps');
let FoldersSteps = require('../../../steps/folders');
let FiltersSteps = require('../../../steps/settings/filters');
let LettersSteps = require('../../../steps/messages/letters');
let InformersSteps = require('../../../steps/informers');

let authorizationStore = require('../../../store/authorization');

let Mail = require('../../../utils/mail');

let sendMessage = function (senderId) {
	let letters = new LettersSteps();

	var mail = new Mail({
		from: authorizationStore.account.get('email'),
		to: authorizationStore.account.get('email'),
		headers: {
			'X-Senderinfo': senderId
		},
		subject: 'subject',
		text: 'text'
	});

	mail.send();

	let stop = false;

	while (!stop) {
		try {
			letters.checkLettersCount(1);
			stop = true;
		} catch (exception) {
			Steps.refresh();
			FiltersSteps.registerCleanerHook();
		}
	}
};

module.exports = {
	Steps,
	FoldersSteps,
	FiltersSteps,
	LettersSteps,
	InformersSteps,

	authorizationStore,

	Mail,

	sendMessage
};
