'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

let store = require('../../../store/search');

let text = 'test';

describe(() => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.simpleSearch(text);

		Messages.open();

		portalSearchSteps.mock(store.requests);
	});

	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка, что если в ящике был поиск, но не включена фича, ' +
		'то популярных поисковых запросов нет.', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.noSuggests();
	});
});
