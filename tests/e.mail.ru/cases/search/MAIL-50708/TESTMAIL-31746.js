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

		let request = store.twoRequests[0];

		portalSearchSteps.toggleAdvanced();
		advancedSteps.clickCheckbox('attach');
		advancedSteps.setFieldText('from', request.correspondents.from);
		advancedSteps.clickSubmit();

		request = store.twoRequests[1];

		portalSearchSteps.removeAllOperands();
		portalSearchSteps.toggleAdvanced();
		advancedSteps.clickCheckbox('unread');
		advancedSteps.clickCheckbox('flag');
		advancedSteps.setFieldText('subject', request.subject);
		advancedSteps.setFieldText('from', request.correspondents.from);
		advancedSteps.setFieldText('to', request.correspondents.to);
		advancedSteps.clickSubmit();

		Messages.features(['search-saved-requests']);
		Messages.open();

		portalSearchSteps.mock(store.twoRequests);
	});

	it('Список писем. Сохранение поисковых запросов. Проверка смены операндов ' +
		'в строке быстрого поиска при переключении стрелками по строкам из списка ' +
		'популярных поисковых запросов', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		let requests = store.twoRequests;
		let suggests = store.twoRequestsSuggests;

		portalSearchSteps.selectSuggestByArrowDown(suggests[0]);

		portalSearchSteps.hasOperand('attach');
		portalSearchSteps.hasOperand('from');
		portalSearchSteps.checkOperandText('from', requests[0].correspondents.from);
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isRequestsSuggest();

		portalSearchSteps.selectSuggestByArrowDown(suggests[1]);

		portalSearchSteps.noOperand('attach');
		portalSearchSteps.hasOperand('unread');
		portalSearchSteps.hasOperand('flag');
		portalSearchSteps.hasOperand('subject');
		portalSearchSteps.checkOperandText('subject', requests[1].subject);
		portalSearchSteps.hasOperand('from');
		portalSearchSteps.checkOperandText('from', requests[1].correspondents.from);
		portalSearchSteps.hasOperand('to');
		portalSearchSteps.checkOperandText('to', requests[1].correspondents.to);
	});
});
