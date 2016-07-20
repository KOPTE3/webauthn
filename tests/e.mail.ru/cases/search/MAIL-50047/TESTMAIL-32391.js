'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let portalSearchSteps = new PortalSearchSteps();

let actions = require('../../../utils/actions');

const firstEmail = 'test1@mail.ru';
const secondEmail = 'test2@mail.ru';
const text = 'test';

describe('TESTMAIL-32391: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		actions.addContact('', firstEmail);
		actions.addContact('', secondEmail);

		portalSearchSteps.clickSearchField();
	});

	it('Поиск. Новые операнды. Проверка, что адрес введённый на результатах поиска ' +
		'НЕ объединяется с первым операндом', () => {
		portalSearchSteps.setOperandText('blank', text);
		portalSearchSteps.hasSuggests();

		portalSearchSteps.clickSuggest(`${firstEmail}\n${firstEmail}`);

		portalSearchSteps.hasOperand('from');
		portalSearchSteps.checkOperandText('from', firstEmail);

		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandTextAndEnter('blank', 'аттач');

		portalSearchSteps.clickOperandClose('message');

		portalSearchSteps.clickSearchField();
		portalSearchSteps.setOperandText('blank', text);
		portalSearchSteps.hasSuggests();

		portalSearchSteps.clickSuggest(`${secondEmail}\n${secondEmail}`);

		portalSearchSteps.hasOperand('from');
		portalSearchSteps.checkOperandText('from', firstEmail);
		portalSearchSteps.hasOperand('to');
		portalSearchSteps.checkOperandText('to', secondEmail);
	});
});
