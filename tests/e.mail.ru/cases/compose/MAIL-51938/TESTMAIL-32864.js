'use strict';

let Signature = require('../../../steps/settings/signature');
let PortalMenuSteps = require('../../../steps/portal-menu');
let portalMenu = new PortalMenuSteps();

let {auth, resetSignatures} = require('./meta');

describe(() => {
	before(() => {
		auth();
		resetSignatures();

		Signature.open();
	});

	it('Настройки. HTML подпись. Проверка, что панель редактирования подписи ' +
		'не отображается поверх открытого меню Еще', () => {
		portalMenu.clickButton('more');
		portalMenu.isMoreVisible();
		Signature.hasWysiwyg();
		portalMenu.isMoreItemsAboveAll();
	});
});
