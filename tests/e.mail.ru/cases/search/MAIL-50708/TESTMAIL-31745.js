'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let store = require('../../../store/search');

describe(() => {
	before(() => {
		Messages.auth();
		Messages.open();

		let [request] = store.oneComplexRequest;

		portalSearchSteps.toggleAdvanced();
		advancedSteps.clickCheckbox('unread');
		advancedSteps.clickCheckbox('flag');
		advancedSteps.setFieldText('subject', request.subject);
		advancedSteps.setFieldText('from', request.correspondents.from);
		advancedSteps.setFieldText('to', request.correspondents.to);
		advancedSteps.clickSubmit();

		Messages.features(['search-saved-requests']);
		Messages.open();

		portalSearchSteps.mock(store.oneComplexRequest);
	});

	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка появления операндов в строке быстрого поиска при ' +
		'навигации стрелками в списке популярных поисковых запросов', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		let [suggest] = store.oneComplexRequestSuggests;
		let [request] = store.oneComplexRequest;

		portalSearchSteps.selectSuggestByArrowDown(suggest);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.checkOperandsOrder(store.oneComplexRequestOperandsOrder);
		portalSearchSteps.checkOperandText('from', request.correspondents.from);
		portalSearchSteps.checkOperandText('to', request.correspondents.to);
		portalSearchSteps.checkOperandText('subject', request.subject);
	});
});
