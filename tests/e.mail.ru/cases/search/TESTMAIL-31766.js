'use strict';

let Messages = require('../../steps/messages');
let portalSearchSteps = require('../../steps/portal-menu/portal-search');

let searchStore = require('../../store/search');

let actions = require('../../utils/actions');
let MessagesUtils = require('../../utils/messages');

describe('TESTMAIL-31766', () => {
	before(() => {
		Messages.auth();

		Messages.open();

		let {messages} = searchStore;

		messages.forEach(fields => {
			actions.sendMessage(
				fields.to,
				fields.from,
				fields.subject,
				fields.text
			);
		});

		Messages.open();

		let flaggedMsg = messages[0];
		let id = MessagesUtils.getLetterIdBySubject(flaggedMsg.subject);

		actions.markAs('flagged', [id]);

		Messages.open();
	});

	it('Проверка соответствия страницы результатов поиска запросу в поисковой строке', () => {


	});
});
