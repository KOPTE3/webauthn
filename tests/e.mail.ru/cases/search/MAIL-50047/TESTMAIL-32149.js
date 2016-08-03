'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

const email = 'test@mail.ru';

describe('Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandText('blank', 'from:');
		portalSearchSteps.setOperandText('from', email);
	});

	it('Поиск. Новые операнды. Проверка, что при смене операндов от и кому ' +
		'не мигает аватарка.', () => {
		portalSearchSteps.clickOperandDropdown('from');
		portalSearchSteps.operandNoAvatar('from');
		portalSearchSteps.clickOperandDropdownItem('from', 'to');
		portalSearchSteps.hasOperand('to');
		portalSearchSteps.operandHasAvatar('to');
		portalSearchSteps.checkOperandAvatar('to', email);
	});
});
