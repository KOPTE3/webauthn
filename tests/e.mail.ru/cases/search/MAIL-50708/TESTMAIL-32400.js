'use strict';

let Messages = require('../../../steps/messages');
let PortalSearchSteps = require('../../../steps/portal-menu/portal-search');
let FoldersSteps = require('../../../steps/folders');

let portalSearchSteps = new PortalSearchSteps();

let foldersStore = require('../../../store/folders');

describe('TESTMAIL-32400: Список писем. Сохранение поисковых запросов. ' +
	'Проверка, что при поиске через компактные фильтры ' +
	'в строке поиска появляются операнды', () => {
	before(() => {
		Messages.auth();
	});

	beforeEach(() => {
		Messages.open();
	});

	foldersStore.filters.forEach(({name, title}) => {
		it(title, () => {
			FoldersSteps.clickFilter(name);

			portalSearchSteps.hasOperand(name);
		});
	});
});
