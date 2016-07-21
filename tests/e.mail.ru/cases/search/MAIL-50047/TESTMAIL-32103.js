'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

describe('TESTMAIL-32103: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.clickSearchField();
	});

	it('Поиск. Новые операнды. Проверка, что при клике мышкой между инпутом и выпадушкой,' +
		' операнд не удаляется', () => {
		portalSearchSteps.setOperandText('blank', 'from:');

		portalSearchSteps.hasOperand('from');
		portalSearchSteps.clickOperandEdge('from');
		portalSearchSteps.hasOperand('from');
		portalSearchSteps.operandHasFocus('from');
	});
});
