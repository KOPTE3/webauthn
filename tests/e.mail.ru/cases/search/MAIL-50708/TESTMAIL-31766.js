'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let SearchLettersSteps = require('../../../steps/search/letters');
let searchStore = require('../../../store/search');
let messagesUtils = require('../../../utils/messages');
let actions = require('../../../utils/actions');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();
let searchLettersSteps = new SearchLettersSteps();

describe(() => {
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

		let id = messagesUtils.getLetterIdBySubject(messages[0].subject);

		actions.markAs('flagged', [id]);

		Messages.open();
	});

	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка соответствия страницы результатов поиска запросу в поисковой строке', () => {
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
