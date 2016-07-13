'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

describe('TESTMAIL-31670', () => {
	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка, что если в ящике не было никаких поисковых запросов,' +
		'то популярные поисковые запросы не появляются.', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.clickSearchField();
		portalSearchSteps.noSuggests();
	});
});
