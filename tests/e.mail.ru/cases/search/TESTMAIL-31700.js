'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');
let portalSearchStore = require('../../store/portal-menu/portal-search');
let advancedStore = require('../../store/portal-menu/advanced');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

describe('TESTMAIL-31700', () => {
	it('Проверка, что при удалении операнда убирается чекбокс', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		advancedStore.checkboxes.forEach(name => {
			advancedSteps.clickCheckbox(name);
			portalSearchSteps.hasOperand(name);
		});

		portalSearchSteps.toggleAdvanced();

		portalSearchStore.flagOperands.forEach(name => {
			portalSearchSteps.clickOperandClose(name);
		});

		portalSearchSteps.toggleAdvanced();
		advancedStore.checkboxes.forEach(name => {
			advancedSteps.isChecked(name, true);
		});
	});
});
