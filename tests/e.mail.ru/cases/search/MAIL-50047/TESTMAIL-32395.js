'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

describe('TESTMAIL-32395: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();
	});

	it('Поиск. Новые операнды. Проверка, что сворачивается операнд ' +
		'после повторного поиска по нажатия на enter', () => {
		portalSearchSteps.clickSearchField();

		portalSearchSteps.setOperandText('blank', 'от:');
		portalSearchSteps.setOperandText('from', 'test@mail.ru');
		portalSearchSteps.setOperandEnter('from');

		portalSearchSteps.clickOperandClose('from');
		portalSearchSteps.isFocusInBlank();

		portalSearchSteps.setOperandText('blank', 'test');
		portalSearchSteps.setOperandEnter('blank');

		portalSearchSteps.hasOperand('message');
		portalSearchSteps.operandNotActive('message');
	});
});
