'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

let store = require('../../store/search');

let text = 'test';

describe('TESTMAIL-31669', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.simpleSearch(text);

		Messages.features(['search-saved-requests']);
		Messages.open();

		portalSearchSteps.mock(store.requests);
	});

	it('Проверка, что после добавления любого операнда' +
		' популярные поисковые запросы не появляются.', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.setOperandText('blank', 'qwerty');
		portalSearchSteps.clickOutside();
		portalSearchSteps.hasOperand('message');

		portalSearchSteps.clickSearchField();

		portalSearchSteps.noSuggests();
	});
});
