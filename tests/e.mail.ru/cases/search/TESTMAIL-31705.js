'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

describe('TESTMAIL-31705: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.clickSearchField();
	});

	it('Поиск. Новые операнды. Проверить, что при смене операнда ' +
		'в строке не мигает другой', () => {
		portalSearchSteps.setOperandText('blank', 'from:');
		portalSearchSteps.setOperandText('from', 'test1@mail.ru');

		portalSearchSteps.clickOperandDropdown('from');
		portalSearchSteps.clickOperandDropdownItem('from', 'to');
		portalSearchSteps.checkOperandSwitch('to', 'from');
	});
});
