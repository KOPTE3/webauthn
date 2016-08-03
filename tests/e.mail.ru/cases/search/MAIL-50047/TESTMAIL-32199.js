'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let advancedStore = require('../../../store/portal-menu/advanced');

const text = 'test@mail.ru';

describe('Поиск. Новые операнды. Проверка, что пропадают данные ' +
	'из строки быстрого поиска  если их удалили из полей в расширенном поиске.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.toggleAdvanced();
	});

	advancedStore.textFields.forEach(name => {
		it(name, () => {
			advancedSteps.setFieldText(name, text);
			portalSearchSteps.hasOperand(name);
			portalSearchSteps.checkOperandText(name, text);

			advancedSteps.setFieldText(name, '');
			portalSearchSteps.noOperand(name);
		});
	});
});
