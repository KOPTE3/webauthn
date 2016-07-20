'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

describe('TESTMAIL-31695', () => {
	it('Список писем. Сохранение поисковых запросов. ' +
		'Добавление операнда "с вложениями" из расширенного поиска', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		let name = 'attach';

		advancedSteps.clickCheckbox(name);
		portalSearchSteps.hasOperand(name);
		portalSearchSteps.operandHasIcon(name);
		portalSearchSteps.checkOperandText(name, '');
		portalSearchSteps.operandHasClose(name);
		advancedSteps.isVisible();
		advancedSteps.isChecked(name);
	});
});
