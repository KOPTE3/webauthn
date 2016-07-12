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

	it('Проверка появления популярных поисковых запросов ' +
		'при появлении курсора в пустом поле ввода', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandText('blank', 'qwerty');
		portalSearchSteps.clickOutside();
		portalSearchSteps.hasOperand('message');

		portalSearchSteps.clickSearchField();

		portalSearchSteps.noSuggests();
	});
});
