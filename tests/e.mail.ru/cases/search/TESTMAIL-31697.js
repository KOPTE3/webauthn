'use strict';

let Messages = require('../../steps/messages');
let portalSearchSteps = require('../../steps/portal-menu/portal-search');
let advancedSteps = require('../../steps/portal-menu/advanced');

describe('TESTMAIL-31697', () => {
	it('Добавление операнда "отмеченные флажком" из расширенного поиска', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		let name = 'flag';

		advancedSteps.clickCheckbox(name);
		portalSearchSteps.hasOperand(name);
		portalSearchSteps.operandHasIcon(name);
		portalSearchSteps.checkOperandText(name, '');
		portalSearchSteps.operandHasClose(name);
		advancedSteps.isVisible();
		advancedSteps.isChecked(name);
	});
});
