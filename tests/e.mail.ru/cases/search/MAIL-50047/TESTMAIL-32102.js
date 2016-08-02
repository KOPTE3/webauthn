'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

const message = 'текст письма';
const subject = 'тема письма';

describe('Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandText('blank', 'message:');
		portalSearchSteps.setOperandText('message', message);
		portalSearchSteps.clickOutside();

		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandText('blank', 'subject:');
		portalSearchSteps.setOperandText('subject', subject);

		portalSearchSteps.clickSearchField();
	});

	it('Поиск. Новые операнды. Проверка, что по shift+tab не разрывается операнд в письме, ' +
		'состоящий из нескольких слов.', () => {
		portalSearchSteps.operandTab('blank', true);
		portalSearchSteps.operandHasFocus('subject');

		portalSearchSteps.operandTab('subject', true);
		portalSearchSteps.operandHasFocus('message');
		portalSearchSteps.checkOperandText('message', message);
		portalSearchSteps.noOperand('blank');
	});
});
