'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let FoldersSteps = require('../../steps/folders');

let portalSearchSteps = new PortalSearchSteps();

describe('TESTMAIL-32402', () => {
	before(() => {
		Messages.auth();
		Messages.open();
	});

	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка, что при поиске через компактные фильтры ' +
		'в строке поиска появляются операнды с вложениями.', () => {
		const name = 'attach';

		FoldersSteps.clickFilter(name);

		portalSearchSteps.hasOperand(name);
	});
});
