'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

const text = 'текст письма';

describe('Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandText('blank', 'message:');
		portalSearchSteps.setOperandText('message', text);
		portalSearchSteps.clickOutside();
	});

	it('Поиск. Новые операнды. Проверка, что при редактировании операнда "в письме", ' +
		'который содержит пробел, не разрывается после ввода новых букв.', () => {
		portalSearchSteps.clickOperand('message');
		portalSearchSteps.operandHasFocus('message');

		portalSearchSteps.operandKeys('message', '1');

		portalSearchSteps.operandHasFocus('message');
		portalSearchSteps.checkOperandText('message', `${text}1`);
		portalSearchSteps.isOperandCursorAtEnd('message');

		portalSearchSteps.operandKeys('message', ' ');

		portalSearchSteps.isFocusInBlank();
		portalSearchSteps.operandNotActive('message');
		portalSearchSteps.checkOperandText('message', `${text}1`);
	});
});
