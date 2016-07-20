'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();


let store = require('../../../store/search');

let text = 'test';

describe('TESTMAIL-31756', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.simpleSearch(text);

		Messages.features(['search-saved-requests']);
		Messages.open();

		portalSearchSteps.mock(store.requests);
	});

	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка открытия расширенного поиска через выпадушку популярных ' +
		'поисковых запросов и через треугольник рядом с лупой.', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.clickRequestsSuggestsAdvanced();
		advancedSteps.isVisible();

		portalSearchSteps.toggleAdvanced();
		advancedSteps.isHidden();

		portalSearchSteps.toggleAdvanced();
		advancedSteps.isVisible();
	});
});
