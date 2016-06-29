'use strict';

let Folders = require('../../steps/folders');

describe('TESTMAIL-31845', () => {
	before(() => {
		Folders.auth();
	});

	beforeEach(() => {
		Folders.open();
	});

	afterEach(() => {
		Folders.resetOffsetTime();
	});

	it('Список писем. Сворачивание папок по времени.' +
		'Проверка, что если в пользовательскую папку и ее подпапку,' +
		'не заходили 1 день, то она свернется', () => {
		// Folders.createFolder({
		// 	name: 'test',
		// 	parent: '0'
		// });

		Folders.setOffsetTime(60 * 24);

		Folders.goToFolder('500000');

		Folders.isFolderHidden('0');

		// browser.execute(function () {
		// 	alert(Date.getUnixtime.toString());
		// });

		// browser.waitForVisible('[id="testset"]', 50000);

		// console.log(Folders.getList());

		// Folders.open();
	});
});

/*
describe('TESTMAIL-31845', () => {
	before(() => {
		page.login({
			login: 'ssdklfjsdklf',
			password: '123qweasd',
			domain: 'mail.ru'
		});
	});

	beforeEach(() => {
		page.open('/messages/inbox');
		browser.waitForVisible('[id="b-nav_folders"]');
	});

	it('Список писем. Сворачивание папок по времени.' +
		'Проверка, что если в пользовательскую папку и ее подпапку,' +
		'не заходили 1 день, то она свернется', () => {
		// browser.click('[id="b-nav_folders"] [data-id="0"]');

		var folding = browser.getAttribute('[id="b-nav_folders"] [data-id="0"]', 'data-folding');

		console.log(1, folding, folding === 'close');

		if (folding === 'close') {
			browser.click('[id="b-nav_folders"] [data-id="0"] [data-name="toggle-folding"]');
			browser.refresh();
			browser.waitForVisible('[id="b-nav_folders"]', 2000);
		}

		browser.click('[id="b-nav_folders"] [data-id="0"] [data-name="toggle-folding"]');

		var elem = browser.element('[id="b-nav_folders"] [data-parent="0"]');


		browser.waitUntil(function () {
			return elem.getCssProperty('display').then(function (result) {
				return result.value === 'none';
			});
		}, 3000, '', 100);

		console.log(1);

		// browser.refresh();
page.open('/messages/inbox?2');
		console.log(2);

		console.log(browser.getUrl());

		// browser.waitForVisible('[id="b-nav_folders"]', 2000);

		var e2 = browser.element('[id="b-nav_folders"]');


		console.log(e2);

		// browser.waitForVisible('[id="b-nav_folders"]');

		// browser.waitForVisible('[id="b-nav_folders"] [data-parent="0"]');

		console.log(elem);

		assert.equal(browser.getUrl(), 'https://e.mail.ru/messages/inbox');
	});
});
*/
