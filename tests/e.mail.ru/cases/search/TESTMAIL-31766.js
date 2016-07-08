'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');
let SearchLettersSteps = require('../../steps/search/letters');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();
let searchLettersSteps = new SearchLettersSteps();

let searchStore = require('../../store/search');

let actions = require('../../utils/actions');
let MessagesUtils = require('../../utils/messages');

describe('TESTMAIL-31766', () => {
	let messages;

	before(() => {
		Messages.auth();

		Messages.open();

		({messages} = searchStore);

		messages.forEach(fields => {
			actions.sendMessage(
				fields.to,
				fields.from,
				fields.subject,
				fields.text
			);
		});

		Messages.open();

		let id = MessagesUtils.getLetterIdBySubject(messages[0].subject);

		actions.markAs('flagged', [id]);

		Messages.open();
	});

	it('Проверка соответствия страницы результатов поиска запросу в поисковой строке', () => {
		let name = 'unread';

		portalSearchSteps.toggleAdvanced();

		advancedSteps.clickCheckbox(name);
		portalSearchSteps.hasOperand(name);

		portalSearchSteps.toggleAdvanced();
		portalSearchSteps.clickSearchButton();
		searchLettersSteps.checkLettersCount(messages.length);
		messages.forEach(({subject}) => {
			searchLettersSteps.checkLetterBySubject(subject);
		});

		portalSearchSteps.toggleAdvanced();
		advancedSteps.isVisible();

		name = 'flag';
		advancedSteps.clickCheckbox(name);
		portalSearchSteps.hasOperand(name);
		portalSearchSteps.hasOperand('unread');

		portalSearchSteps.toggleAdvanced();
		portalSearchSteps.clickSearchButton();

		searchLettersSteps.checkLettersCount(1);
		searchLettersSteps.checkLetterBySubject(messages[0].subject);
		searchLettersSteps.checkLetterBySubject(messages[1].subject, true);
	});
});
