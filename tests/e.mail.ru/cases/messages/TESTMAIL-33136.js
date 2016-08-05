'use strict';

let Steps = require('../../steps');
let Messages = require('../../steps/messages');
let Compose = require('../../steps/compose');
let Folders = require('../../steps/folders');
let Toolbar = require('../../steps/messages/toolbar');

let messages = new Messages();
let toolbar = new Toolbar();

describe(() => {
	it('Проверка отсутствия -Infinity в last_modified', () => {
		Messages.auth();
		messages.toggleThreads(false);
		Messages.open('/messages/drafts');

		Messages.setAjaxLog('messages/status');

		toolbar.clickButton('compose');
		Compose.wait();

		Messages.getAjaxsLog('messages/status', stack => {
			return stack.some(request => {
				return !request.settings.url.includes('Infinity');
			});
		});
	});
});
