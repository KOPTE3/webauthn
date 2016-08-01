'use strict';

let Sent = require('../../steps/sent');

describe(() => {
	it('Открытие страницы отправленного письма', () => {
		Sent.auth();
		Sent.open();
	});
});
