'use strict';

let Steps = require('../../../steps');
let FoldersSteps = require('../../../steps/folders');
let FiltersSteps = require('../../../steps/settings/filters');
let LettersSteps = require('../../../steps/messages/letters');
let InformersSteps = require('../../../steps/informers');

let sendMessage = function (senderId) {
	let informers = new InformersSteps();
	let letters = new LettersSteps();

	informers.sendMessage(senderId);

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

	sendMessage
};
