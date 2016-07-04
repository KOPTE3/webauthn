'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');
let AdvancedStore = require('../../store/portal-menu/advanced');

describe('TESTMAIL-31671', () => {
	it('Проверка, что в расширенном поиске при клике в поля адресатов,' +
		'темы и кому популярные поисковые запросы не появляются', () => {
		Messages.auth();
		Messages.open();

		PortalSearchSteps.simpleSearch();
		Messages.open();
		PortalSearchSteps.toggleAdvanced();

		AdvancedStore.textFields.forEach(name => {
			AdvancedSteps.clickField(name);
			AdvancedSteps.noSuggests(name);
		});
	});
});
