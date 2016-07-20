'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

let actions = require('../../../utils/actions');

const email = 'test1@mail.ru';

describe('TESTMAIL-32387: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		actions.addContact('', email);

		portalSearchSteps.clickSearchField();
	});

	it('Поиск. Новые операнды. Проверка, что первое значение из саджеста' +
		' не выделяется, а ставится курсор после него в строке быстрого поиска.', () => {
		const operandName = 'from';

		portalSearchSteps.setOperandText('blank', 't');
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isPeopleSuggest();

		portalSearchSteps.selectSuggestByArrowDown(`${email}\n${email}`);

		portalSearchSteps.hasOperand(operandName);
		portalSearchSteps.operandHasFocus(operandName);
		portalSearchSteps.isOperandCursorAtEnd(operandName);
	});
});
