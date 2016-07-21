'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

describe('TESTMAIL-32189: Поиск. Новые операнды.', () => {
	before(() => Messages.auth());

	beforeEach(() => Messages.open());

	['Tab', 'Escape'].forEach(key => {
		it(`Поиск. Новые операнды. Проверка, что сворачивается операнд "в письме", ` +
			`если до этого не было выбрано ни одного операнда: ${key}`, () => {
			portalSearchSteps.clickSearchField();
			portalSearchSteps.setOperandText('blank', 'текст письма');

			if (key === 'Tab') {
				portalSearchSteps.operandTab('blank');
			} else {
				portalSearchSteps.operandEscape('blank');
			}

			portalSearchSteps.hasOperand('message');
		});
	});
});
