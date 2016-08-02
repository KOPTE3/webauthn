'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

let actions = require('../../../utils/actions');

const email = 'test1@mail.ru';

describe('Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		actions.addContact('', email);
	});

	it('Поиск. Новые операнды. Проверка, что если после первого клика в поле поиска ' +
		'ничего не вводили и кликнули еще раз, то вместо операнда "от" ' +
		'НЕ отображается пустой операнд', () => {
		portalSearchSteps.clickSearchField();
		portalSearchSteps.isFocusInBlank();

		portalSearchSteps.clickSearchField();
		portalSearchSteps.isFocusInBlank();

		portalSearchSteps.setOperandText('blank', 't');
		portalSearchSteps.hasSuggests();
		portalSearchSteps.isPeopleSuggest();

		portalSearchSteps.selectSuggestByArrowDown(`${email}\n${email}`);

		portalSearchSteps.hasOperand('from');
		portalSearchSteps.checkOperandText('from', email);
		portalSearchSteps.operandHasFocus('from');

		portalSearchSteps.operandKeys('from', ' ');

		portalSearchSteps.hasOperand('from');
		portalSearchSteps.checkOperandText('from', email);
		portalSearchSteps.operandNotActive('from');
	});
});
