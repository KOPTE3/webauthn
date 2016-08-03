'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let actions = require('../../../utils/actions');

const advancedStore = require('../../../store/portal-menu/advanced');

const email = 'test@mail.ru';
const name = 'Test Test2';

describe('Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		actions.addContact(name, email);

		portalSearchSteps.toggleAdvanced();
	});

	advancedStore.emailFields.forEach(field => {
		it('Поиск. Новые операнды. Проверка, что в строке поиска в операнде отображается ' +
			'только адрес, если в расширенном поиске через саджест ' +
			'и пробел выбрали адрес: ' + field, () => {
			advancedSteps.setFieldText(field, 't');
			advancedSteps.hasSuggests(field);
			portalSearchSteps.hasOperand(field);
			portalSearchSteps.checkOperandText(field, 't');

			advancedSteps.selectSuggestByKeys(field, `${name}\n${email}`);

			advancedSteps.checkFieldText(field, email);
			portalSearchSteps.checkOperandText(field, email);

			advancedSteps.setFieldKeys(field, ' ');
			portalSearchSteps.checkOperandText(field, email);
		});
	});
});
