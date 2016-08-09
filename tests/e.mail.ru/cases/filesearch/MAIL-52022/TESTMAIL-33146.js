'use strict';

let Messages = require('../../../steps/messages');
let FileSearch = require('../../../steps/filesearch');

let messages = new Messages();
let fileSearch = new FileSearch();

let { options = { method: 'messages/status' } } = module.parent;
let { method } = options;

describe(() => {
	before(() => {
		FileSearch.auth();
		messages.toggleThreads(method === 'threads/status');
	});

	it(`Проверка отсутствия значения -Infinity в параметре last_modified ' +
	'запроса ${method} при фильтрации по пустой папке`, () => {
		FileSearch.open();

		FileSearch.setAjaxLog('send', method);

		fileSearch.goToFolder('sent');
		fileSearch.isEmptyFolder();

		FileSearch.getAjaxLog(method, stack => {
			return stack.some(request => {
				return !request.settings.url.includes('Infinity');
			});
		});
	});
});
