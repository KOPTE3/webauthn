'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let store = require('../../../store/search');

describe('TESTMAIL-31747', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		let request = store.threeRequests[0];

		portalSearchSteps.toggleAdvanced();
		advancedSteps.clickCheckbox('attach');
		advancedSteps.setFieldText('from', request.correspondents.from);
		advancedSteps.clickSubmit();

		request = store.threeRequests[1];

		portalSearchSteps.removeAllOperands();
		portalSearchSteps.toggleAdvanced();
		advancedSteps.clickCheckbox('unread');
		advancedSteps.clickCheckbox('flag');
		advancedSteps.setFieldText('subject', request.subject);
		advancedSteps.setFieldText('from', request.correspondents.from);
		advancedSteps.setFieldText('to', request.correspondents.to);
		advancedSteps.clickSubmit();

		request = store.threeRequests[2];

		portalSearchSteps.removeAllOperands();
		portalSearchSteps.toggleAdvanced();
		advancedSteps.clickCheckbox('flag');
		advancedSteps.setFieldText('subject', request.subject);
		advancedSteps.clickSubmit();

		Messages.features(['search-saved-requests']);
		Messages.open();

		portalSearchSteps.mock(store.threeRequests);
	});

	it('Список писем. Сохранение поисковых запросов. Проверка, что после ' +
		'выбора стрелкой одного из вариантов в списке популярных поисковых ' +
		'запросов список вариантов все еще показывается.', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		let suggests = store.threeRequestsSuggests;

		portalSearchSteps.selectSuggestByArrowDown(suggests[0]);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.selectSuggestByArrowDown(suggests[1]);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.selectSuggestByArrowDown(suggests[2]);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.selectSuggestByArrowDown(suggests[0]);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();
	});
});
