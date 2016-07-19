'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let store = require('../../../store/search');

describe('TESTMAIL-31694', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		let request = store.anotherTwoRequests[0];

		portalSearchSteps.toggleAdvanced();
		advancedSteps.clickCheckbox('attach');
		advancedSteps.setFieldText('from', request.correspondents.from);
		advancedSteps.clickSubmit();

		request = store.anotherTwoRequests[1];

		portalSearchSteps.removeAllOperands();
		portalSearchSteps.toggleAdvanced();
		advancedSteps.clickCheckbox('unread');
		advancedSteps.clickCheckbox('attach');
		advancedSteps.clickCheckbox('flag');
		advancedSteps.setFieldText('subject', request.subject);
		advancedSteps.setFieldText('from', request.correspondents.from);
		advancedSteps.setFieldText('to', request.correspondents.to);
		advancedSteps.clickSubmit();

		Messages.features(['search-saved-requests']);
		Messages.open();

		portalSearchSteps.mock(store.anotherTwoRequests);
	});

	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка расположения операндов в строке списка ' +
		'популярных поисковых запросов.', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		let suggests = store.anotherTwoRequestsSuggests;

		portalSearchSteps.selectSuggestByArrowDown(suggests[0]);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.selectSuggestByArrowDown(suggests[1]);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();
	});
});
