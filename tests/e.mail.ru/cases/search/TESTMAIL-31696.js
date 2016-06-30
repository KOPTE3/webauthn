'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../steps/portal-menu/advanced');

describe('TESTMAIL-31696', () => {
	it('Добавление операнда "непрочитанные" из расширенного поиска', () => {
		Messages.auth();
		Messages.open();
		PortalSearchSteps.toggleAdvanced();

		let name = 'unread';

		AdvancedSteps.clickCheckbox(name);
		PortalSearchSteps.hasOperand(name);
		PortalSearchSteps.operandHasIcon(name);
		PortalSearchSteps.operandHasText(name, '');
		PortalSearchSteps.operandHasClose(name);
		AdvancedSteps.isVisible();
		AdvancedSteps.isChecked(name);
	});
});
