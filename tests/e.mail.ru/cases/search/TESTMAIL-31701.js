'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');
let PortalSearchStore = require('../../store/portal-menu/portal-search');
let AdvancedStore = require('../../store/portal-menu/advanced');

describe('TESTMAIL-31701', () => {
	it('Добавление операнда "с вложениями" из расширенного поиска', () => {
		Messages.auth();
		Messages.open();
		PortalSearchSteps.toggleAdvanced();


		AdvancedStore.checkboxes.forEach(name => {
			AdvancedSteps.clickCheckbox(name);
			PortalSearchSteps.hasOperand(name);
		});

		PortalSearchStore.flagOperands.forEach(name => {
			PortalSearchSteps.clickOperand(name);
			PortalSearchSteps.isFocusInBlank();
		});
	});
});
