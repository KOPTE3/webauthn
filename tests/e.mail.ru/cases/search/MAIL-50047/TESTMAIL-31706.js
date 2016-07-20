'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

describe('TESTMAIL-31706: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandText('blank',
			'длинный текст 1 длинный текст 2 длинный текст 3 от:');
		portalSearchSteps.setOperandText('from', 'ok_nez13@mail.ru');
		portalSearchSteps.clickOutside();
	});

	it('Поиск. Новые операнды. Проверить постановку курсора в конец текста ' +
		'длинного операнда при его редактировании', () => {
		portalSearchSteps.clickOperand('message');
		portalSearchSteps.operandHasFocus('message');
		portalSearchSteps.isOperandCursorAtEnd('message');

		portalSearchSteps.clickOutside();
		portalSearchSteps.operandNotActive('message');

		portalSearchSteps.clickOperandEdge('message');
		portalSearchSteps.operandHasFocus('message');
		portalSearchSteps.isOperandCursorAtEnd('message');

		portalSearchSteps.clickSearchField();
		portalSearchSteps.isFocusInBlank();

		portalSearchSteps.operandTab('blank', true);
		portalSearchSteps.operandHasFocus('from');
		portalSearchSteps.isOperandCursorAtEnd('from');

		portalSearchSteps.operandTab('from', true);
		portalSearchSteps.operandHasFocus('message');
		portalSearchSteps.isOperandCursorAtEnd('message');
	});
});
