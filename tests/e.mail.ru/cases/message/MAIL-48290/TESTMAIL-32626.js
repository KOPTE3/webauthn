'use strict';

let Messages = require('../../../steps/messages');
let Message = require('../../../steps/message');
let Body = require('../../../steps/message/body');
let Video = require('../../../steps/layers/video');
let body = new Body();
let video = new Video();

let messageStore = require('../../../store/message');

let actions = require('../../../utils/actions');
let messagesUtils = require('../../../utils/messages');

let messageId;

describe(() => {
	before(() => {
		Messages.auth();
		Messages.open();

		let message = messageStore.youtubeMessage;

		actions.sendMessage(message.to, message.from, message.subject, message.text);

		Messages.open();

		messageId = messagesUtils.getLetterIdBySubject(message.subject);
	});

	beforeEach(() => {
		Message.open(`/message/${messageId}/`);
	});

	messageStore.youtubeMessageLinks.forEach(({link, time}) => {
		it(`Чтение письма. AJAX. Проверить проигрывание ссылок со временем
		на youtube: ${link}`, () => {
			body.clickLink(link);
			video.wait();
			video.checkVideoStartTime(time);
		});
	});
});
