'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

let store = require('../../store/search');

let constants = require('../../utils/constants');

let text = 'test';

describe('TESTMAIL-31660: Список писем. Сохранение поисковых запросов. Проверка появления ' +
	'популярных поисковых запросов, если удалить все операнды ' +
	'из строки поиска', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.simpleSearch(text);

		Messages.features(['search-saved-requests']);
		Messages.open();

		portalSearchSteps.mock(store.requests);
	});

	it('Удаление через крестик', () => {
		portalSearchSteps.addAnyOperand();

		portalSearchSteps.clickSearchField();

		portalSearchSteps.clickOperandClose('message');
		portalSearchSteps.isFocusInBlank();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();
	});

	it('Удаление через backspace', () => {
		portalSearchSteps.addAnyOperand();

		portalSearchSteps.clickSearchField();

		portalSearchSteps.setOperandText('blank', constants.UNICODE_CHARACTERS.Backspace);
		portalSearchSteps.isFocusInBlank();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();
	});
});
