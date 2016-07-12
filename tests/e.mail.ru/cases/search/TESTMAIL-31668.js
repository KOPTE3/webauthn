'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

let store = require('../../store/search');

let actions = require('../../utils/actions');

let text = 'test';

describe('TESTMAIL-31668', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.simpleSearch(text);

		actions.addContact('', 'test1@mail.ru');

		Messages.features(['search-saved-requests']);
		Messages.open();

		portalSearchSteps.mock(store.requests);
	});

	it('Проверка, что при вводе букв в строку поиска ' +
		'популярные поисковые запросы заменяются на саджесты', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.setOperandText('blank', 't');
		browser.pause(1000);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isPeopleSuggest();
	});
});
