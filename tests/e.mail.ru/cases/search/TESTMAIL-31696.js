'use strict';

let Messages = require('../../steps/messages');
let portalSearchSteps = require('../../steps/portal-menu/portal-search');
let advancedSteps = require('../../steps/portal-menu/advanced');

describe('TESTMAIL-31696', () => {
	it('Добавление операнда "непрочитанные" из расширенного поиска', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		let name = 'unread';

		advancedSteps.clickCheckbox(name);
		portalSearchSteps.hasOperand(name);
		portalSearchSteps.operandHasIcon(name);
		portalSearchSteps.checkOperandText(name, '');
		portalSearchSteps.operandHasClose(name);
		advancedSteps.isVisible();
		advancedSteps.isChecked(name);
	});
});
