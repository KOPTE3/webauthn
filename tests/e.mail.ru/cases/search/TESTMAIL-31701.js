'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let PortalSearchStore = require('../../store/portal-menu/portal-search');
let AdvancedStore = require('../../store/portal-menu/advanced');

describe('TESTMAIL-31701', () => {
	it('Проверка невозможности редактирования операндов-флажков', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		AdvancedStore.checkboxes.forEach(name => {
			advancedSteps.clickCheckbox(name);
			portalSearchSteps.hasOperand(name);
		});

		PortalSearchStore.flagOperands.forEach(name => {
			portalSearchSteps.clickOperand(name);
			portalSearchSteps.isFocusInBlank();
		});
	});
});
