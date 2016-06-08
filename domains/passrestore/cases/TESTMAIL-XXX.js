'use strict';

let page = require('../object');

it('Passremind. Тестовый кейс.', () => {
	page.open(`/password/restore`);

	console.log(browser.getText(page.view));
});