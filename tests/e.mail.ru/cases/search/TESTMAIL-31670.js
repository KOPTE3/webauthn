'use strict';

let Messages = require('../../steps/messages');
let portalSearchSteps = require('../../steps/portal-menu/portal-search');

describe('TESTMAIL-31670', () => {
	it('Проверка, что если в ящике не было никаких поисковых запросов,' +
		'то популярные поисковые запросы не появляются.', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.clickSearchField();
		portalSearchSteps.noSuggests();
	});
});
