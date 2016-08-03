'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchStore = require('../../../store/portal-menu/portal-search');
let advancedStore = require('../../../store/portal-menu/advanced');

let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

describe(() => {
	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка невозможности редактирования операндов-флажков', () => {
		Messages.auth();
		Messages.open();
		portalSearchSteps.toggleAdvanced();

		advancedStore.checkboxes.forEach(name => {
			advancedSteps.clickCheckbox(name);
			portalSearchSteps.hasOperand(name);
		});

		portalSearchStore.flagOperands.forEach(name => {
			portalSearchSteps.clickOperand(name);
			portalSearchSteps.isFocusInBlank();
		});
	});
});
