'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');

describe('TESTMAIL-31697', () => {
	it('Добавление операнда "отмеченные флажком" из расширенного поиска', () => {
		Messages.auth();
		Messages.open();
		PortalSearchSteps.toggleAdvanced();

		let name = 'flag';

		AdvancedSteps.clickCheckbox(name);
		PortalSearchSteps.hasOperand(name);
	});
});
