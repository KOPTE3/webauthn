'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let advancedStore = require('../../store/portal-menu/advanced');

describe('TESTMAIL-31671', () => {
	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка, что в расширенном поиске при клике в поля адресатов,' +
		'темы и кому популярные поисковые запросы не появляются', () => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.simpleSearch();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		advancedStore.textFields.forEach(name => {
			advancedSteps.clickField(name);
			advancedSteps.noSuggests(name);
		});
	});
});
