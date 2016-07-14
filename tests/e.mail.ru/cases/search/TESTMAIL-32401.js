'use strict';

let Messages = require('../../steps/messages');
let PortalSearchSteps = require('../../steps/portal-menu/portal-search');
let FoldersSteps = require('../../steps/folders');

let portalSearchSteps = new PortalSearchSteps();

describe('TESTMAIL-32401', () => {
	before(() => {
		Messages.auth();
		Messages.open();
	});

	it('Список писем. Сохранение поисковых запросов. ' +
		'Проверка, что при поиске через компактные фильтры ' +
		'в строке поиска появляются операнды с флажком.', () => {
		const name = 'flag';

		FoldersSteps.clickFilter(name);

		portalSearchSteps.hasOperand(name);
	});
});
