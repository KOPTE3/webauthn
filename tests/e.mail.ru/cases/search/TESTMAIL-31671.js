'use strict';

let Messages = require('../../steps/messages');
let portalSearchSteps = require('../../steps/portal-menu/portal-search');
let advancedSteps = require('../../steps/portal-menu/advanced');
let AdvancedStore = require('../../store/portal-menu/advanced');

describe('TESTMAIL-31671', () => {
	it('Проверка, что в расширенном поиске при клике в поля адресатов,' +
		'темы и кому популярные поисковые запросы не появляются', () => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.simpleSearch();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		AdvancedStore.textFields.forEach(name => {
			advancedSteps.clickField(name);
			advancedSteps.noSuggests(name);
		});
	});
});
