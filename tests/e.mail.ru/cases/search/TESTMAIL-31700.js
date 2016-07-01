'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');
let PortalSearchStore = require('../../store/portal-menu/portal-search');
let AdvancedStore = require('../../store/portal-menu/advanced');

describe('TESTMAIL-31700', () => {
	it('Проверка, что при удалении операнда убирается чекбокс', () => {
		Messages.auth();
		Messages.open();
		PortalSearchSteps.toggleAdvanced();

		AdvancedStore.checkboxes.forEach(name => {
			AdvancedSteps.clickCheckbox(name);
			PortalSearchSteps.hasOperand(name);
		});

		PortalSearchSteps.toggleAdvanced();

		PortalSearchStore.flagOperands.forEach(name => {
			PortalSearchSteps.clickOperandClose(name);
		});

		PortalSearchSteps.toggleAdvanced();
		AdvancedStore.checkboxes.forEach(name => {
			AdvancedSteps.isChecked(name, true);
		});
	});
});
