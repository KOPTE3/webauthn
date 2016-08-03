'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

let advancedStore = require('../../../store/portal-menu/advanced');

const texts = {
	from: 'test@mail.ru',
	to: 'test_2@mail.ru',
	subject: 'тема письмо',
	message: 'текст письма'
};

describe('Поиск. Новые операнды. Проверка, что в каком поле в расширенном ' +
	'поиске стоит курсор, тот операнд в строке быстрого поиска должен быть на виду.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		advancedStore.textFields.forEach(name => {
			portalSearchSteps.clickSearchField();
			portalSearchSteps.setOperandText('blank', `${name}:`);
			portalSearchSteps.setOperandText(name, texts[name]);
		});

		portalSearchSteps.toggleAdvanced();
	});

	advancedStore.textFields.forEach(name => {
		it(name, () => {
			advancedSteps.checkFieldText(name, texts[name]);
			advancedSteps.clickField(name);
			portalSearchSteps.isOperandVisible(name);
		});
	});
});
