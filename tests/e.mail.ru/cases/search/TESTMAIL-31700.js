'use strict';

let Messages = require('../../steps/messages');
let portalSearchSteps = require('../../steps/portal-menu/portal-search');
let advancedSteps = require('../../steps/portal-menu/advanced');
let PortalSearchStore = require('../../store/portal-menu/portal-search');
let AdvancedStore = require('../../store/portal-menu/advanced');

describe('TESTMAIL-31700', () => {
	it('Проверка, что при удалении операнда убирается чекбокс', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		AdvancedStore.checkboxes.forEach(name => {
			advancedSteps.clickCheckbox(name);
			portalSearchSteps.hasOperand(name);
		});

		portalSearchSteps.toggleAdvanced();

		PortalSearchStore.flagOperands.forEach(name => {
			portalSearchSteps.clickOperandClose(name);
		});

		portalSearchSteps.toggleAdvanced();
		AdvancedStore.checkboxes.forEach(name => {
			advancedSteps.isChecked(name, true);
		});
	});
});
