'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let AdvancedSteps = require('../../../steps/portal-menu/advanced');
let portalSearchSteps = new PortalSearchSteps();
let advancedSteps = new AdvancedSteps();

describe('TESTMAIL-32389: Поиск. Новые операнды.', () => {
	before(() => {
		Messages.auth();
		Messages.open();

		portalSearchSteps.toggleAdvanced();
		advancedSteps.setFieldText('from', 'test1@mail.ru');
		advancedSteps.setFieldText('to', 'test2@mail.ru');
		advancedSteps.clickSubmit();
	});

	it('Поиск. Новые операнды. Проверка, что при раскрытии расширенного поиска ' +
		'не дергаеются операнды в быстром поиске.', () => {
		portalSearchSteps.checkScrollOnToggleAdvanced();
	});
});
