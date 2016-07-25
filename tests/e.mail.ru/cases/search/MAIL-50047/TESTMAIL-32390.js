'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

const text = 'test';

describe('TESTMAIL-32390: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();
	});

	it('Поиск. Новые операнды. Проверка, что не переходим к мобильной версии почты ' +
		'по нажатию на tab с последующим нажатием на enter.', () => {
		portalSearchSteps.clickSearchField();

		portalSearchSteps.setOperandText('blank',text);

		portalSearchSteps.operandTab('blank');

		portalSearchSteps.isFocusInSearchButton();
		portalSearchSteps.searchButtonEnter();
		portalSearchSteps.hasOperand('message');
		portalSearchSteps.checkOperandText('message', text);
	});
});
