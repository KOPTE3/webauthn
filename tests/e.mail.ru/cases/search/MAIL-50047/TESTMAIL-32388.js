'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

const text = 'начало111222333444555666777888999000конецзапроса';

describe('TESTMAIL-32388: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandText('blank', text);
		portalSearchSteps.clickSearchButton();
		portalSearchSteps.clickOperand('message');
	});

	it('Проверка, что операнде с длинным текстом отображается ' +
		'начало текста после сворачивания операнда.', () => {
		const name = 'message';

		portalSearchSteps.clickOutside();
		portalSearchSteps.operandNotActive(name);
		portalSearchSteps.isOperandTextStartVisible(name);
	});
});
